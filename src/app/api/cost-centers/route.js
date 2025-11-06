import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  // Parâmetros do PrimeReact Dropdown 'onLazyLoad'
  const skip = parseInt(searchParams.get('skip') || '0', 10)
  const take = parseInt(searchParams.get('take') || '20', 10)

  // Busca os itens da "página"
  try {
    const items = await prisma.costCenter.findMany({
      skip: skip,
      take: take,
      orderBy: {
        name: 'asc',
      },
    })

    const total = await prisma.costCenter.count()

    return NextResponse.json({
      items,
      total,
    })
  } catch (error) {
    console.error('Erro na API /api/cost-centers:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
