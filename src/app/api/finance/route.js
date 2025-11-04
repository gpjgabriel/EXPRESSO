import { NextResponse } from 'next/server';
import { mockFinanceData } from '@/data/mockData';

export async function GET() {
  await new Promise((r) => setTimeout(r, 1000));
  return NextResponse.json(mockFinanceData);
}