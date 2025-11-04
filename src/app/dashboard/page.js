'use client';
import Header from '@/Components/header';
import FilterBar from '@/Components/filterBar';
import InfoCards from '@/Components/infoCards';
import PeriodChart from '@/Components/periodChart';
import ResultTable from '@/Components/resultTable';
import { useState } from 'react';


export default function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <Header />
      <FilterBar onDateChange={(start, end) => {
        setStartDate(start);
        setEndDate(end);
      }} />
      <InfoCards startDate={startDate} endDate={endDate}/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1rem 1rem' }}>
        <PeriodChart startDate={startDate} endDate={endDate} />
        <ResultTable startDate={startDate} endDate={endDate} />
      </div>
    </>
  );
}