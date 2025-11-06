// src/Components/dashboard/resultTable/ResultTable.test.jsx
import React from 'react'
import { render, screen, within } from '@testing-library/react' // Importa o 'within'
import '@testing-library/jest-dom'

// O componente que estamos testando
import ResultTable from './index.jsx'

// --- MOCKS ---
jest.mock('./styles.js', () => ({
  TableWrapper: ({ children }) => <div data-testid="table-wrapper">{children}</div>,
}))

jest.mock('primereact/progressbar', () => ({
  ProgressBar: () => <div data-testid="loading-progressbar" />,
}))

// --- DADOS DE TESTE ---
const mockApiData = {
  transactions: [
    { date: new Date('2025-10-01'), type: 'RECEITA', value: 10000, user: { name: 'SUZANO' } },
    { date: new Date('2025-10-02'), type: 'DESPESA', value: 5000, user: { name: 'SUZANO' } },
    { date: new Date('2025-10-01'), type: 'RECEITA', value: 20000, user: { name: 'ITABIRA' } },
    { date: new Date('2025-10-02'), type: 'DESPESA', value: 30000, user: { name: 'ITABIRA' } },
  ],
  billsAwaiting: [],
  billsOverdue: [],
}

// --- TESTES ---

describe('ResultTable Component', () => {
  /**
   * Teste 1: Estado de Carregamento (Corrigido)
   */
  it('deve renderizar a barra de progresso quando loading=true', () => {
    render(<ResultTable loading={true} apiData={null} />)

    // 1. Verifica se a barra de loading está lá
    expect(screen.getByTestId('loading-progressbar')).toBeInTheDocument()

    // 2. CORREÇÃO: Verifica se os DADOS (não os cabeçalhos) estão ausentes
    expect(screen.queryByText('SUZANO')).not.toBeInTheDocument()
    expect(screen.queryByText('ITABIRA')).not.toBeInTheDocument()
  })

  /**
   * Teste 2: Dados Carregados (Corrigido)
   */
  it('deve agrupar por usuário e calcular os totais e rodapé corretamente', () => {
    render(<ResultTable loading={false} apiData={mockApiData} />)

    // --- 2.1: Verificar a Linha "SUZANO" ---
    // (Esta lógica 'within' já estava correta [cite: 71-1-1])
    const rowSuzano = screen.getByText('SUZANO').closest('tr')
    expect(within(rowSuzano).getByText('R$ 10.000,00')).toBeInTheDocument() // Receita
    const suzano5k = within(rowSuzano).getAllByText('R$ 5.000,00')
    expect(suzano5k).toHaveLength(2) // Despesa e Resultado

    // --- 2.2: Verificar a Linha "ITABIRA" ---
    const rowItabira = screen.getByText('ITABIRA').closest('tr')
    expect(within(rowItabira).getByText('R$ 30.000,00')).toBeInTheDocument() // Despesa
    expect(within(rowItabira).getByText('R$ 20.000,00')).toBeInTheDocument() // Receita
    expect(within(rowItabira).getByText('R$ -10.000,00')).toBeInTheDocument() // Resultado

    // --- 2.3: Verificar o Rodapé (Corrigido) ---
    // Encontramos a linha (tr) do rodapé pelo texto "Total" [cite: 43-1-1]
    const footerRow = screen.getByText('Total').closest('tr')

    // Verificamos os totais DENTRO dessa linha específica
    expect(within(footerRow).getByText('R$ 35.000,00')).toBeInTheDocument() // Total Despesa
    expect(within(footerRow).getByText('R$ 30.000,00')).toBeInTheDocument() // Total Receita
    expect(within(footerRow).getByText('R$ -5.000,00')).toBeInTheDocument() // Total Resultado
  })
})
