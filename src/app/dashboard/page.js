'use client';
import Header from '@/Components/header';
import FilterBar from '@/Components/filterBar';
import InfoCards from '@/Components/infoCards';
import PeriodChart from '@/Components/periodChart';
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
      <InfoCards />
      <PeriodChart startDate={startDate} endDate={endDate} />
    </>
  );
}