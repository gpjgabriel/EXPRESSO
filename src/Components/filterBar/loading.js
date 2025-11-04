'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import * as Styled from './styles';

export default function LoadingFilterBar() {
  return (
    <Styled.FilterContainer>
      <div className="filters-left">
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

      <div className="button-container">
        <Skeleton width="80px" height="2rem" />
        <Skeleton width="100px" height="2rem" />
      </div>
    </Styled.FilterContainer>
  );
}