const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Limpando dados antigos...')
  await prisma.transaction.deleteMany({})
  await prisma.bill.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.costCenter.deleteMany({})

  console.log('Criando Centros de Custo...')
  const cc1 = await prisma.costCenter.create({
    data: { name: 'Infraestrutura' },
  })
  const cc2 = await prisma.costCenter.create({
    data: { name: 'Marketing' },
  })

  console.log('Criando Usuários (para a tabela de resultados)...')
  const user1 = await prisma.user.create({
    data: { name: 'SUZANO TRANSPORTE FLORESTAL' },
  })
  const user2 = await prisma.user.create({
    data: { name: 'TRANSPORTE DE AGREGADOS ITABIRA MG' },
  })

  console.log('Criando Transações...')
  await prisma.transaction.createMany({
    data: [
      {
        date: new Date('2025-10-01'),
        description: 'Frete A',
        type: 'RECEITA',
        value: 20000,
        costCenterId: cc1.id,
        userId: user1.id,
        issued: true,
      },
      {
        date: new Date('2025-10-03'),
        description: 'Combustível',
        type: 'DESPESA',
        value: 5000,
        costCenterId: cc1.id,
        userId: user1.id,
        issued: true,
      },
      {
        date: new Date('2025-10-05'),
        description: 'Frete B',
        type: 'RECEITA',
        value: 33549.47,
        costCenterId: cc1.id,
        userId: user1.id,
        issued: true,
      },
      {
        date: new Date('2025-10-10'),
        description: 'Manutenção',
        type: 'DESPESA',
        value: 48549.47,
        costCenterId: cc1.id,
        userId: user1.id,
        issued: true,
      },
      {
        date: new Date('2025-10-02'),
        description: 'Pedágios',
        type: 'DESPESA',
        value: 14191.32,
        costCenterId: cc2.id,
        userId: user2.id,
        issued: false,
      },
    ],
  })

  console.log('Criando Contas (para os InfoCards)...')
  await prisma.bill.createMany({
    data: [
      {
        description: 'Nota fiscal 1 (Vencida)',
        value: 7500,
        dueDate: new Date('2025-10-01'),
        type: 'A_RECEBER',
        status: 'PENDENTE',
      },
      {
        description: 'Fornecedor X (Vencido)',
        value: 34853,
        dueDate: new Date('2025-10-01'),
        type: 'A_PAGAR',
        status: 'PENDENTE',
      },
      {
        description: 'Cliente Y (A Vencer)',
        value: 10000,
        dueDate: new Date('2025-12-01'),
        type: 'A_RECEBER',
        status: 'PENDENTE',
      },
      {
        description: 'Software (A Vencer)',
        value: 2000,
        dueDate: new Date('2025-12-01'),
        type: 'A_PAGAR',
        status: 'PENDENTE',
      },
    ],
  })

  console.log('Seed concluído.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
