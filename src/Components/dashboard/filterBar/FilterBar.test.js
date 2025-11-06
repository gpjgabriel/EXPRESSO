import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import FilterBar from './index.jsx'

jest.mock('./loading.js', () => () => <div data-testid="loading-filterbar" />)
jest.mock('./styles.js', () => ({
  FilterContainer: ({ children }) => <div>{children}</div>,
  BackButton: () => <button />,
  CalendarInput: props => <input data-testid="calendar-input" value={props.value || ''} onChange={props.onChange} />,
  PdfButton: props => <button onClick={props.onClick}>{props.label}</button>,
  FilterButton: props => <button onClick={props.onClick}>{props.label}</button>,
}))

// Mock do Checkbox
jest.mock('primereact/checkbox', () => ({
  Checkbox: props => (
    <input
      type="checkbox"
      checked={props.checked}
      onChange={e => {
        props.onChange({ checked: e.target.checked })
      }}
    />
  ),
}))

// Mock do Dropdown
jest.mock('primereact/dropdown', () => {
  const React = require('react')
  return {
    Dropdown: props => {
      React.useEffect(() => {
        if (props.virtualScrollerOptions?.onLazyLoad) {
          props.virtualScrollerOptions.onLazyLoad({ first: 0, last: 10 })
        }
      }, [])

      return (
        <select
          data-testid="mock-dropdown"
          value={props.value ? props.value.id : ''}
          onChange={e => {
            const selectedOption = props.options.find(opt => opt && opt.id === e.target.value)
            props.onChange({ value: selectedOption })
          }}
        >
          <option value="">{props.placeholder}</option>
          {props.options?.map((opt, i) =>
            opt ? (
              <option key={i} value={opt.id}>
                {opt.name}
              </option>
            ) : null,
          )}
        </select>
      )
    },
  }
})

global.fetch = jest.fn()

describe('FilterBar Component', () => {
  const mockSetStartDate = jest.fn()
  const mockSetEndDate = jest.fn()
  const mockSetCostCenter = jest.fn()
  const mockSetIssued = jest.fn()
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            items: [{ id: 'cc1', name: 'Centro de Custo Mock 1' }],
            total: 1,
          }),
      }),
    )
  })

  const renderAndWait = async () => {
    await act(async () => {
      render(
        <FilterBar
          startDate={null}
          setStartDate={mockSetStartDate}
          endDate={null}
          setEndDate={mockSetEndDate}
          costCenter={null}
          setCostCenter={mockSetCostCenter}
          issued={false}
          setIssued={mockSetIssued}
          onSearch={mockOnSearch}
        />,
      )
    })

    await waitFor(
      () => {
        expect(screen.getByText('Pesquisar')).toBeInTheDocument()
      },
      { timeout: 10000 },
    )
  }

  it('deve chamar a API de centros de custo e exibir os dados', async () => {
    await renderAndWait()

    // Verifica se a API foi chamada
    expect(fetch).toHaveBeenCalledWith('/api/cost-centers?skip=0&take=10')

    // Verifica se o item carregado aparece no dropdown
    expect(await screen.findByText('Centro de Custo Mock 1')).toBeInTheDocument()
  }, 15000)

  it('deve chamar as funções de "set" do componente pai ao alterar os filtros', async () => {
    await renderAndWait()

    // Testa o Checkbox "Emitidos"
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockSetIssued).toHaveBeenCalledWith(true)

    // Testa o Dropdown "Centro de Custo"
    const dropdown = screen.getByTestId('mock-dropdown')
    fireEvent.change(dropdown, { target: { value: 'cc1' } })
    expect(mockSetCostCenter).toHaveBeenCalledWith({ id: 'cc1', name: 'Centro de Custo Mock 1' })
  }, 15000)

  it('deve chamar a função "onSearch" do pai ao clicar em "Pesquisar"', async () => {
    await renderAndWait()

    const searchButton = screen.getByText('Pesquisar')
    fireEvent.click(searchButton)
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  }, 15000)
})
