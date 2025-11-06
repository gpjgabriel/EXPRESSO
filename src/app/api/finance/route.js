import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  // Captura dos Filtros
  const startDate = searchParams.get('startDate') // Espera formato ISO (ex: "2025-10-01T00:00:00.000Z")
  const endDate = searchParams.get('endDate')
  const costCenterId = searchParams.get('costCenterId')
  const issued = searchParams.get('issued')

  // Query de Filtro
  const whereClause = {
    date: {},
    issued: undefined,
    costCenterId: undefined,
  }

  if (startDate) {
    whereClause.date.gte = new Date(startDate)
  }
  if (endDate) {
    whereClause.date.lte = new Date(endDate)
  }
  if (costCenterId) {
    whereClause.costCenterId = costCenterId
  }
  if (issued === 'true') {
    whereClause.issued = true
  }

  // Limpa filtros vazios
  if (Object.keys(whereClause.date).length === 0) {
    delete whereClause.date
  }

  try {
    // Transações (Para Gráfico de Período e Tabela de Resultado)
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true } }, // Para a tabela de resultado
        costCenter: { select: { name: true } }, // Para o filtro
      },
    })

    // Contas a Pagar/Receber (Para os InfoCards)
    const billsWhere = {
      status: 'PENDENTE',
      dueDate: {},
    }
    if (startDate) billsWhere.dueDate.gte = new Date(startDate)
    if (endDate) billsWhere.dueDate.lte = new Date(endDate)
    if (Object.keys(billsWhere.dueDate).length === 0) {
      delete billsWhere.dueDate
    }

    const bills = await prisma.bill.findMany({
      where: billsWhere,
    })

    // Contas Vencidas (Para os InfoCards)
    const overdueBills = await prisma.bill.findMany({
      where: {
        status: 'PENDENTE',
        dueDate: { lt: new Date() },
      },
    })

    return NextResponse.json({
      transactions,
      billsAwaiting: bills, // Contas a vencer no período
      billsOverdue: overdueBills, // Contas vencidas totais
    })
  } catch (error) {
    console.error('Erro na API /api/finance:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
