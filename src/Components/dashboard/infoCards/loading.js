'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';


export default function LoadingInfoCards() {
  const cards = Array.from({ length: 5 });

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '1rem', flexWrap: 'wrap' }}>
      {cards.map((_, index) => (
        <div 
          style={{ 
            position: 'relative',
            flex: '1 1 150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: '250px',
            height: '160px',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          }} 
         key={index}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem  1rem 0'}}> 
            <Skeleton width="120px" height="1rem" />
            <Skeleton width="2rem" height="2rem" shape="circle" />
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 1rem'}}>
            <Skeleton width="90%" height="2rem" />
          </div>

          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '8px',
              width: '100%',
              borderRadius: '0 0 10px 10px',
              marginTop: '1rem',
              color: 'red'
            }} 
          >
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  );
}