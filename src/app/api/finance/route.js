import { NextResponse } from 'next/server';
import { mockFinanceData } from '@/data/mockData';

export async function GET() {
  return NextResponse.json(mockFinanceData);
}