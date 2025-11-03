'use client';
import Header from '@/Components/header';
import FilterBar from '@/Components/filterBar';
import InfoCards from '@/Components/infoCards';


export default function Dashboard() {
  return (
    <>
      <Header />
      <FilterBar />
      <InfoCards />
    </>
  );
}