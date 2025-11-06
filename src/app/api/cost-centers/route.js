// src/app/api/cost-centers/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DEFAULT_PAGE_SIZE = 20 // Nosso fallback

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  // 1. Captura os parâmetros (takeParam pode ser "undefined")
  const skipParam = searchParams.get('skip') || '0'
  const takeParam = searchParams.get('take')

  // 2. Validação robusta
  let skip = parseInt(skipParam, 10)
  let take = parseInt(takeParam, 10)

  if (isNaN(skip)) {
    skip = 0
  }

  // 3. Esta é a correção crucial: Se 'take' for NaN (porque era "undefined"),
  //    nós usamos o tamanho padrão (20) em vez de falhar.
  if (isNaN(take)) {
    take = DEFAULT_PAGE_SIZE
  }

  try {
    const items = await prisma.costCenter.findMany({
      skip: skip,
      take: take, // 'take' agora é um número (0 ou 20), não NaN
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
