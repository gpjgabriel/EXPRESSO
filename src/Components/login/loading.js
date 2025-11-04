'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #ede9fe 0%, #f3f4f6 100%)',
      }}
    >
      <div 
        style={{ 
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem 3rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Skeleton height="5rem" className="mb-6" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <Skeleton height="2.5rem" width="100%" />
          <Skeleton height="2.5rem" width="100%" />
        </div>
          <Skeleton height="3rem" width="100%" className="mb-6"/>
      </div>
    </div>
  );
}