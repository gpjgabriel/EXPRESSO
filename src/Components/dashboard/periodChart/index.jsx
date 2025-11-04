'use client';

import React from 'react';
import { Chart } from 'primereact/chart';
import * as Styled from './styles.js';
import useFinanceData from '@/hooks/useFinanceData.js';
import { LoadingChart } from './loading.js';


export default function PeriodChart({ startDate, endDate }) {
  const { data, loading } = useFinanceData(startDate, endDate);

  if (loading) return <LoadingChart />;

  const grouped = data.reduce((acc, item) => {
    const date = new Date(item.data).toLocaleDateString('pt-BR');
    if (!acc[date]) acc[date] = { receita: 0, despesa: 0 };
    acc[date].receita += item.receita;
    acc[date].despesa += item.despesa;
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const receitas = labels.map((d) => grouped[d].receita);
  const despesas = labels.map((d) => grouped[d].despesa);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Receita (R$)',
        data: receitas,
        borderColor: '#6b21a8',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Despesa (R$)',
        data: despesas,
        borderColor: '#2563eb',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: '#6b21a8' } } },
    scales: {
      x: { ticks: { color: '#6b7280' } },
      y: { ticks: { color: '#6b7280', callback: (v) => `R$ ${v}` } },
    },
  };

  return (
    <Styled.ChartContainer>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6b7280' }}>Resultados por Período</span>
      <Chart type="line" data={chartData} options={chartOptions} />
    </Styled.ChartContainer>
  );
}
