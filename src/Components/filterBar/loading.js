'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import * as Styled from './styles';

export default function LoadingFilterBar() {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        backgroundColor: '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        margin: '1rem',
        flexWrap: 'wrap',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
      <div style={{display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem'}}>
        <Skeleton width="3rem" height="2rem" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton width="100px" height="0.9rem" style={{ marginBottom: '0.25rem' }} />
          <Skeleton width="200px" height="2rem" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton width="80px" height="0.9rem" style={{ marginBottom: '0.25rem' }} />
          <Skeleton width="150px" height="2rem" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton width="80px" height="0.9rem" style={{ marginBottom: '0.25rem' }} />
          <Skeleton width="150px" height="2rem" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Skeleton width="1.2rem" height="1.2rem" />
          <Skeleton width="60px" height="0.9rem" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
        <Skeleton width="80px" height="2rem" />
        <Skeleton width="100px" height="2rem" />
      </div>
    </div>
  );
}