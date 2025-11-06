import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from './index.jsx'

import { useUser } from '@/context/UserContext'

jest.mock('@/context/UserContext')

jest.mock('./loading.js', () => () => <div data-testid="loading-header" />) // [cite: 91-1-1]

jest.mock('./styles.js', () => ({
  Header: ({ children }) => <header>{children}</header>,
  Nav: ({ children }) => <nav>{children}</nav>,
  LeftMenu: ({ children }) => <div>{children}</div>,
  RightMenu: ({ children }) => <div>{children}</div>,
  NavButton: props => (
    <button icon={props.icon} className={props.className} style={props.style}>
      {props.label}
    </button>
  ),
  UserInfo: ({ children }) => <div>{children}</div>,
  UserAvatar: props => <span>{props.label}</span>,
}))

describe('Header Component', () => {
  const mockedUseUser = useUser

  beforeEach(() => {
    mockedUseUser.mockClear()
  })

  it('deve renderizar o LoadingHeader se o usuário não estiver carregado', () => {
    mockedUseUser.mockReturnValue({ user: {} })

    render(<Header />)

    // Verifica skeleton de loading
    expect(screen.getByTestId('loading-header')).toBeInTheDocument()

    expect(screen.queryByText('Adicionar')).not.toBeInTheDocument()
    expect(screen.queryByText('Contas à Pagar')).not.toBeInTheDocument()
  })

  it('deve renderizar os itens do menu e as informações do usuário quando o usuário estiver carregado', () => {
    const mockUser = { name: 'Usuário Teste', department: 'Financeiro' }
    mockedUseUser.mockReturnValue({ user: mockUser })

    render(<Header />)

    expect(screen.queryByTestId('loading-header')).not.toBeInTheDocument()

    expect(screen.getByText('Adicionar')).toBeInTheDocument()
    expect(screen.getByText('Contas à Pagar')).toBeInTheDocument()
    expect(screen.getByText('Contas à Receber')).toBeInTheDocument()
    expect(screen.getByText('Relatórios')).toBeInTheDocument()

    expect(screen.getByText('Usuário Teste')).toBeInTheDocument()
    expect(screen.getByText('Financeiro')).toBeInTheDocument()

    // Verifica o Avatar
    expect(screen.getByText('U')).toBeInTheDocument()
  })
})
