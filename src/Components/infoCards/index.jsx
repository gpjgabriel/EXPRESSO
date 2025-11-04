'use client';

import useFinanceData from '@/hooks/useFinanceData';
import * as Styled from './styles';
import { Button } from 'primereact/button';


export default function InfoCards({ startDate, endDate }) {
  const { data, loading } = useFinanceData(startDate, endDate);

  if (loading) return <p>Carregando dados...</p>; // APLICAR SKELETON AQUI DEPOIS
  
  const totalReceita = data.reduce((acc, d) => acc + d.receita, 0);
  const totalDespesa = data.reduce((acc, d) => acc + d.despesa, 0);

  const contasVencidasReceber = data.reduce((acc, d) => acc + d.contasVencidas.aReceber, 0);
  const contasVencidasPagar = data.reduce((acc, d) => acc + d.contasVencidas.aPagar, 0);

  const contasAVencerReceber = data.reduce((acc, d) => acc + d.contasAVencer.aReceber, 0);
  const contasAVencerPagar = data.reduce((acc, d) => acc + d.contasAVencer.aPagar, 0);

  const cardsData = [
    { title: 'Receita Total', 
      icon: 'pi pi-chart-line', 
      borderColor: 'green', 
      values: [`R$ ${totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`] },
    { title: 'Despesa Total', 
      icon: 'pi pi-chart-line', 
      borderColor: 'red', 
      values: [`R$ ${totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`] },
    { title: 'Lucro Líquido', 
      icon: 'pi pi-chart-line', 
      borderColor: 'yellow', 
      values: [`R$ ${(totalReceita - totalDespesa).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`] },
    {
      title: 'Contas Vencidas',
      icon: 'pi pi-exclamation-triangle',
      borderColor: 'blue',
      labels: ['Receber', 'A Pagar'],
      values: [
        `R$ ${contasVencidasReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${contasVencidasPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ]
    },
    {
      title: 'Contas a Vencer',
      icon: 'pi pi-clock',
      borderColor: 'blue',
      labels: ['Receber', 'A Pagar'],
      values: [
        `R$ ${contasAVencerReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        `R$ ${contasAVencerPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      ]
    },
  ];

  return (
    <Styled.CardsContainer>
      {cardsData.map((card, index) => (
        <Styled.CardContent key={index}>
          <Styled.CardHeader>
            <h4 style={{ margin: 0 }}>{card.title}</h4>
            <Button icon={card.icon} className="p-button-text p-button-rounded" />
          </Styled.CardHeader>
          
          <Styled.CardValuesContainer>
            {card.values.map((value, i) => (
              <div className='card-value-block' key={i}>
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
