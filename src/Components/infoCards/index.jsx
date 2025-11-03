'use client';

import * as Styled from './styles';
import { Button } from 'primereact/button';

const cardsData = [
  { title: 'Card 1', icon: 'pi pi-info-circle', borderColor: 'green', values: ['R$ 0,00'] },
  { title: 'Card 2', icon: 'pi pi-info-circle', borderColor: 'red', values: ['R$ 0,00'] },
  { title: 'Card 3', icon: 'pi pi-info-circle', borderColor: 'yellow', values: ['R$ 0,00'] },
  {
    title: 'Card 4',
    icon: 'pi pi-info-circle',
    borderColor: 'blue',
    values: ['R$ 0,00', 'R$ 0,00'],
    labels: ['Receber', 'A Pagar']
  },
  {
    title: 'Card 5',
    icon: 'pi pi-info-circle',
    borderColor: 'blue',
    values: ['R$ 0,00', 'R$ 0,00'],
    labels: ['Receber', 'A Pagar']
  },
];

export default function InfoCards() {
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
