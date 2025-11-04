'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export function LoadingChart({ height = '300px', width = '60%' }) {
  return <Skeleton width={width} height={height} borderRadius="12px" />;
}