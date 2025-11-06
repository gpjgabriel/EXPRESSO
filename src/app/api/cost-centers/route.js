import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PAGE_SIZE = 8

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') // ID do último item visto

  try {
    const costCenters = await prisma.costCenter.findMany({
      take: PAGE_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        name: 'asc',
      },
    })

    // próximo cursor
    const nextCursor = costCenters.length === PAGE_SIZE ? costCenters[PAGE_SIZE - 1].id : null

    return NextResponse.json({
      items: costCenters,
      nextCursor, // Solicita próxima "página"
    })
  } catch (error) {
    console.error('Erro na API /api/cost-centers:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
