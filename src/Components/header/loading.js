'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function LoadingHeader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Skeleton width="60px" height="1rem" />
        <Skeleton width="60px" height="1rem" />
        <Skeleton width="60px" height="1rem" />
        <Skeleton width="60px" height="1rem" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Skeleton width="2rem" height="2rem" shape="circle" />
        <Skeleton width="2rem" height="2rem" shape="circle" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
          <Skeleton width="60px" height="0.9rem" />
          <Skeleton width="80px" height="0.7rem" />
        </div>
        <Skeleton width="2.5rem" height="2.5rem" shape="circle" />
      </div>
    </div>
  );
}