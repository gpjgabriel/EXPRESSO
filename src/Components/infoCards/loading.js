'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import * as Styled from './styles';

export default function LoadingInfoCards() {
  // Criar 5 Skeleton cards, igual aos cards reais
  const cards = Array.from({ length: 5 });

  return (
    <Styled.CardsContainer>
      {cards.map((_, index) => (
        <Styled.CardContent key={index}>
          {/* Header do card */}
          <Styled.CardHeader>
            <Skeleton width="120px" height="1rem" /> {/* Título */}
            <Skeleton width="2rem" height="2rem" shape="circle" /> {/* Ícone */}
          </Styled.CardHeader>

          {/* Valores do card */}
          <Styled.CardValuesContainer>
            <div className='card-value-block'>
              <Skeleton width="50px" height="0.8rem" /> {/* Label */}
              <Skeleton width="80px" height="1.2rem" /> {/* Valor */}
            </div>
            <div className='card-value-block'>
              <Skeleton width="50px" height="0.8rem" /> {/* Label */}
              <Skeleton width="80px" height="1.2rem" /> {/* Valor */}
            </div>
          </Styled.CardValuesContainer>

          {/* Footer border */}
          <Styled.CardFooterBorder color="#d1d5db" /> {/* Borda neutra */}
        </Styled.CardContent>
      ))}
    </Styled.CardsContainer>
  );
}