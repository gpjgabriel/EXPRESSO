// src/Components/dashboard/infoCards/InfoCards.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import InfoCards from './index.jsx'

// Mock do componente de Loading
jest.mock('./loading.js', () => () => <div data-testid="loading-skeleton" />)

// Mock dos Styled Components
jest.mock('./styles.js', () => ({
  CardsContainer: ({ children }) => <div data-testid="cards-container">{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardValuesContainer: ({ children }) => <div>{children}</div>,
  CardFooterBorder: () => <div />,
}))

// Mock do PrimeReact Button
jest.mock('primereact/button', () => ({
  Button: props => <button data-testid="pr-button" icon={props.icon} />,
}))

const mockApiData = {
  transactions: [
    { type: 'RECEITA', value: 1000.5 },
    { type: 'RECEITA', value: 500.25 }, // Total Receita: 1500.75
    { type: 'DESPESA', value: 300 },
    { type: 'DESPESA', value: 200.2 }, // Total Despesa: 500.20
  ],
  billsOverdue: [
    { type: 'A_RECEBER', value: 100 }, // Vencidas Receber: 100
    { type: 'A_PAGAR', value: 50 }, // Vencidas Pagar: 50
  ],
  billsAwaiting: [
    { type: 'A_RECEBER', value: 200 }, // A Vencer Receber: 200
    { type: 'A_PAGAR', value: 75 }, // A Vencer Pagar: 75
  ],
}

describe('InfoCards Component', () => {
  it('deve renderizar o skeleton de loading quando loading=true', () => {
    render(<InfoCards loading={true} apiData={null} />)

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()

    expect(screen.queryByText('Total Receita')).not.toBeInTheDocument()
  })

  it('deve renderizar o skeleton de loading quando apiData=null', () => {
    render(<InfoCards loading={false} apiData={null} />)

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()

    expect(screen.queryByText('Total Receita')).not.toBeInTheDocument()
  })

  it('deve calcular e exibir os valores corretos quando os dados são fornecidos', () => {
    render(<InfoCards loading={false} apiData={mockApiData} />)

    // Verifica se o loading sumiu
    expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument()

    // Verifica se os títulos dos cards estão na tela
    expect(screen.getByText('Total Receita')).toBeInTheDocument()
    expect(screen.getByText('Total Despesa')).toBeInTheDocument()
    expect(screen.getByText('Lucro Líquido')).toBeInTheDocument()
    expect(screen.getByText('Contas Vencidas')).toBeInTheDocument()
    expect(screen.getByText('Contas a Vencer')).toBeInTheDocument()

    // Verifica os cálculos (o ponto-chave)

    // Transações
    expect(screen.getByText('R$ 1.500,75')).toBeInTheDocument() // Receita: 1000.50 + 500.25
    expect(screen.getByText('R$ 500,20')).toBeInTheDocument() // Despesa: 300 + 200.20
    expect(screen.getByText('R$ 1.000,55')).toBeInTheDocument() // Lucro: 1500.75 - 500.20

    // Vencidas
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument() // Vencidas Receber
    expect(screen.getByText('R$ 50,00')).toBeInTheDocument() // Vencidas Pagar

    // A Vencer
    expect(screen.getByText('R$ 200,00')).toBeInTheDocument() // A Vencer Receber
    expect(screen.getByText('R$ 75,00')).toBeInTheDocument() // A Vencer Pagar
  })
})
