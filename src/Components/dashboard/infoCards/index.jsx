'use client'

import * as Styled from './styles'
import { Button } from 'primereact/button'
import LoadingInfoCards from './loading'

const sumValues = (array, typeFilter, valueField = 'value') => {
  if (!array) return 0
  return array.filter(item => item.type === typeFilter).reduce((acc, item) => acc + item[valueField], 0)
}

export default function InfoCards({ apiData, loading }) {
  if (loading || !apiData) return <LoadingInfoCards />

  const { transactions, billsAwaiting, billsOverdue } = apiData

  const totalReceita = sumValues(transactions, 'RECEITA')
  const totalDespesa = sumValues(transactions, 'DESPESA')

  const contasVencidasReceber = sumValues(billsOverdue, 'A_RECEBER')
  const contasVencidasPagar = sumValues(billsOverdue, 'A_PAGAR')

  const contasAVencerReceber = sumValues(billsAwaiting, 'A_RECEBER')
  const contasAVencerPagar = sumValues(billsAwaiting, 'A_PAGAR')

  const cardsData = [
    {
      title: 'Total Receita',
      icon: 'pi pi-arrow-circle-up',
      borderColor: '#16a34a',
      values: [`R$ ${totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
    },
    {
      title: 'Total Despesa',
      icon: 'pi pi-arrow-circle-down',
      borderColor: '#dc2626',
      values: [`R$ ${totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
    },
    {
      title: 'Lucro Líquido',
      icon: 'pi pi-thumbs-up',
      borderColor: '#eab308',
      values: [`R$ ${(totalReceita - totalDespesa).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      isLucro: true,
    },
    {
      title: 'Contas Vencidas',
      icon: 'pi pi-calendar-times',
      borderColor: '#0ea5e9',
      labels: ['Receber', 'A Pagar'],
      values: [
        `R$ ${contasVencidasReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${contasVencidasPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      ],
    },
    {
      title: 'Contas a Vencer',
      icon: 'pi pi-calendar-clock',
      borderColor: '#0ea5e9',
      labels: ['Receber', 'A Pagar'],
      values: [
        `R$ ${contasAVencerReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${contasAVencerPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      ],
    },
  ]

  return (
    <Styled.CardsContainer>
      {cardsData.map((card, index) => (
        <Styled.CardContent key={index}>
          <Styled.CardHeader>
            <h4 className="card-title">{card.title}</h4>
            <Button
              icon={card.icon}
              className="p-button-text p-button-rounded"
              style={{
                color: card.borderColor,
              }}
            />
          </Styled.CardHeader>

          <Styled.CardValuesContainer>
            {card.values.map((value, i) => (
              <div
                className={`card-value-block ${!card.labels ? 'no-label' : ''} ${card.isLucro ? 'lucro' : ''}`}
                key={i}
              >
                {card.labels && <span className="value-label">{card.labels[i]}</span>}
                <div className="card-value">{value}</div>
              </div>
            ))}
          </Styled.CardValuesContainer>

          <Styled.CardFooterBorder color={card.borderColor} />
        </Styled.CardContent>
      ))}
    </Styled.CardsContainer>
  )
}
