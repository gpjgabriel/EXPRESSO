import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ResultTable from './index.jsx'

jest.mock('./styles.js', () => ({
  TableWrapper: ({ children }) => <div data-testid="table-wrapper">{children}</div>,
}))

jest.mock('primereact/progressbar', () => ({
  ProgressBar: () => <div data-testid="loading-progressbar" />,
}))

const mockApiData = {
  transactions: [
    // Total Suzano: R$10k (Receita), D$5k (Despesa) = R$ 5k (Resultado)
    { date: new Date('2025-10-01'), type: 'RECEITA', value: 10000, user: { name: 'SUZANO' } },
    { date: new Date('2025-10-02'), type: 'DESPESA', value: 5000, user: { name: 'SUZANO' } },

    // Total Itabira: R$20k (Receita), D$30k (Despesa) = R$ -10k (Resultado)
    { date: new Date('2025-10-01'), type: 'RECEITA', value: 20000, user: { name: 'ITABIRA' } },
    { date: new Date('2025-10-02'), type: 'DESPESA', value: 30000, user: { name: 'ITABIRA' } },
  ],

  billsAwaiting: [],
  billsOverdue: [],
}

describe('ResultTable Component', () => {
  it('deve renderizar a barra de progresso quando loading=true', () => {
    render(<ResultTable loading={true} apiData={null} />)

    expect(screen.getByTestId('loading-progressbar')).toBeInTheDocument()

    expect(screen.queryByText('Nome')).not.toBeInTheDocument()
  })

  it('deve agrupar por usuário e calcular os totais e rodapé corretamente', () => {
    render(<ResultTable loading={false} apiData={mockApiData} />)

    expect(screen.queryByTestId('loading-progressbar')).not.toBeInTheDocument()

    expect(screen.getByText('SUZANO')).toBeInTheDocument()
    expect(screen.getByText('ITABIRA')).toBeInTheDocument()

    expect(screen.getByText('R$ 5.000,00')).toBeInTheDocument() // Suzano Despesa
    expect(screen.getByText('R$ 30.000,00')).toBeInTheDocument() // Itabira Despesa

    expect(screen.getByText('R$ 10.000,00')).toBeInTheDocument() // Suzano Receita
    expect(screen.getByText('R$ 20.000,00')).toBeInTheDocument() // Itabira Receita

    expect(screen.getByText('R$ 5.000,00')).toBeInTheDocument() // Suzano Resultado (10k - 5k)
    expect(screen.getByText('R$ -10.000,00')).toBeInTheDocument() // Itabira Resultado (20k - 30k)

    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('R$ 35.000,00')).toBeInTheDocument() // Total Despesa (5k + 30k)
    expect(screen.getByText('R$ 30.000,00')).toBeInTheDocument() // Total Receita (10k + 20k)
    expect(screen.getByText('R$ -5.000,00')).toBeInTheDocument() // Total Resultado (30k - 35k)
  })
})
