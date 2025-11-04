'use client';

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { ChartContainer, ChartTitle } from './styles.js';

const MOCK_DATA = [
  { date: '2025-01-01', value1: 1000, value2: -800 },
  { date: '2025-02-02', value1: 1200, value2: -1950 },
  { date: '2025-03-03', value1: 900,  value2: -700 },
  { date: '2025-04-04', value1: 1500, value2: -1300 },
  { date: '2025-05-05', value1: 800,  value2: 0 },
  { date: '2025-06-06', value1: 1700, value2: 0 },
  { date: '2025-07-07', value1: 2000, value2: 0 },
  { date: '2025-08-08', value1: 0, value2: 0 },
  { date: '2025-09-09', value1: 800, value2: 0 },
  { date: '2025-10-10', value1: 0, value2: 0 },
  { date: '2025-11-11', value1: 2000, value2: 0 },
];

export default function PeriodChart({ startDate, endDate }) {
  const [filteredData, setFilteredData] = useState(MOCK_DATA);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filtered = MOCK_DATA.filter((d) => {
        const current = new Date(d.date);
        return current >= start && current <= end;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(MOCK_DATA);
    }
  }, [startDate, endDate]);

  const chartData = {
    labels: filteredData.map((d) => new Date(d.date).toLocaleDateString('pt-BR')),
    datasets: [
      {
        label: 'Resultado 1 (R$)',
        data: filteredData.map((d) => d.value1),
        fill: false,
        borderColor: '#6b21a8',
        tension: 0.4,
        pointBackgroundColor: '#6b21a8',
      },
      {
        label: 'Resultado 2 (R$)',
        data: filteredData.map((d) => d.value2),
        fill: false,
        borderColor: '#2563eb',
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#4b0082',
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `R$ ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#6b7280' },
        grid: { color: '#e5e7eb' },
      },
      y: {
        ticks: {
          color: '#6b7280',
          callback: (value) => `R$ ${value}`,
        },
        grid: { color: '#f3f4f6' },
      },
    },
  };

  return (
    <ChartContainer>
      <h3 style={{marginBottom: '1rem'}}>Resultados por Período</h3>
      <Chart type="line" data={chartData} options={chartOptions} />
    </ChartContainer>
  );
}
