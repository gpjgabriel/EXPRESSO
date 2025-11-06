import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import PeriodChart from './index.jsx'

jest.mock('./loading.js', () => ({
  LoadingChart: () => <div data-testid="loading-chart-skeleton" />,
}))

jest.mock('./styles.js', () => ({
  ChartContainer: ({ children }) => <div data-testid="chart-container">{children}</div>,
}))

const mockPrimeChart = jest.fn()
jest.mock('primereact/chart', () => ({
  Chart: props => {
    mockPrimeChart(props)
    return <div data-testid="mock-chart" />
  },
}))

const mockApiData = {
  transactions: [
    { date: new Date('2025-10-01T12:00:00Z'), type: 'RECEITA', value: 100 },
    { date: new Date('2025-10-01T13:00:00Z'), type: 'DESPESA', value: 50 }, // Dia 1: R$100, D$50
    { date: new Date('2025-10-02T14:00:00Z'), type: 'RECEITA', value: 200 }, // Dia 2: R$200, D$0
  ],

  billsAwaiting: [],
  billsOverdue: [],
}

describe('PeriodChart Component', () => {
  beforeEach(() => {
    mockPrimeChart.mockClear()
  })

  it('deve renderizar o skeleton de loading quando loading=true', () => {
    render(<PeriodChart loading={true} apiData={null} />) // [cite: 43-1-1]

    expect(screen.getByTestId('loading-chart-skeleton')).toBeInTheDocument()

    expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument()
  })

  it('deve renderizar o skeleton de loading quando apiData=null', () => {
    render(<PeriodChart loading={false} apiData={null} />)

    expect(screen.getByTestId('loading-chart-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument()
  })

  it('deve agrupar os dados por data e passá-los corretamente para o Chart', () => {
    render(<PeriodChart loading={false} apiData={mockApiData} />)

    expect(screen.queryByTestId('loading-chart-skeleton')).not.toBeInTheDocument()
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument()

    expect(screen.getByText('Resultados por Período')).toBeInTheDocument()

    // Verifica se o componente <Chart> do PrimeReact foi chamado
    expect(mockPrimeChart).toHaveBeenCalledTimes(1)

    // Pega os dados que foram passados para o <Chart>
    const chartProps = mockPrimeChart.mock.calls[0][0].data

    expect(chartProps.labels).toEqual(['01/10/2025', '02/10/2025'])

    // Verifica os datasets (cálculos)
    // Receitas: 100 (dia 1) + 200 (dia 2)
    expect(chartProps.datasets[0].data).toEqual([100, 200])
    expect(chartProps.datasets[0].label).toBe('Receita (R$)')

    // Despesas: 50 (dia 1) + 0 (dia 2)
    expect(chartProps.datasets[1].data).toEqual([50, 0])
    expect(chartProps.datasets[1].label).toBe('Despesa (R$)')
  })
})
