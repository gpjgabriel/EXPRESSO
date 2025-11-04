'use client';

import useFinanceData from '@/hooks/useFinanceData';
import * as Styled from './styles';
import { Button } from 'primereact/button';
import LoadingInfoCards from './loading';


export default function InfoCards({ startDate, endDate }) {
  const { data, loading } = useFinanceData(startDate, endDate);
  
  const totalReceita = data.reduce((acc, d) => acc + d.receita, 0);
  const totalDespesa = data.reduce((acc, d) => acc + d.despesa, 0);

  const contasVencidasReceber = data.reduce((acc, d) => acc + d.contasVencidas.aReceber, 0);
  const contasVencidasPagar = data.reduce((acc, d) => acc + d.contasVencidas.aPagar, 0);

  const contasAVencerReceber = data.reduce((acc, d) => acc + d.contasAVencer.aReceber, 0);
  const contasAVencerPagar = data.reduce((acc, d) => acc + d.contasAVencer.aPagar, 0);

  const cardsData = [
    { title: 'Total Receita', icon: 'pi pi-arrow-circle-up', borderColor: '#16a34a', 
      values: [`R$ ${totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`] },
    { title: 'Total Despesa', icon: 'pi pi-arrow-circle-down', borderColor: '#dc2626', 
      values: [`R$ ${totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`] },
    { title: 'Lucro Líquido', icon: 'pi pi-thumbs-up', borderColor: '#eab308', 
      values: [`R$ ${(totalReceita - totalDespesa).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`], isLucro: true },
    {
      title: 'Contas Vencidas',
      icon: 'pi pi-calendar-times',
      borderColor: '#0ea5e9',
      labels: ['Receber', 'A Pagar'],
      values: [
        `R$ ${contasVencidasReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${contasVencidasPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ]
    },
    {
      title: 'Contas a Vencer',
      icon: 'pi pi-calendar-clock',
      borderColor: '#0ea5e9',
      labels: ['Receber', 'A Pagar'],
      values: [
        `R$ ${contasAVencerReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${contasAVencerPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ]
    },
  ];

  if (loading) return <LoadingInfoCards />;

  return (
    <Styled.CardsContainer>
      {cardsData.map((card, index) => (
        <Styled.CardContent key={index}>
          <Styled.CardHeader>
            <h4 className='card-title'>{card.title}</h4>
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
                className={`card-value-block ${!card.labels ? 'no-label' : ''} ${card.isLucro ? 'lucro' : ''}`} key={i}
              >
                {card.labels && <span className='value-label'>{card.labels[i]}</span>}
                <div className='card-value'>{value}</div>
              </div>
            ))}
          </Styled.CardValuesContainer>

          <Styled.CardFooterBorder color={card.borderColor} />
        </Styled.CardContent>
      ))}
    </Styled.CardsContainer>
  );
}
