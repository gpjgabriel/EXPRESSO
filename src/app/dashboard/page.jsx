'use client'

import Header from '@/Components/dashboard/header'
import FilterBar from '@/Components/dashboard/filterBar'
import InfoCards from '@/Components/dashboard/infoCards'
import PeriodChart from '@/Components/dashboard/periodChart'
import ResultTable from '@/Components/dashboard/resultTable'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [costCenter, setCostCenter] = useState(null)
  const [issued, setIssued] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)

    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate.toISOString())
    if (endDate) params.append('endDate', endDate.toISOString())
    if (costCenter) params.append('costCenterId', costCenter.id)
    if (issued) params.append('issued', 'true')

    try {
      const res = await fetch(`/api/finance?${params.toString()}`)
      if (!res.ok) {
        throw new Error('Falha ao buscar os dados')
      }
      const data = await res.json()
      setApiData(data)
    } catch (error) {
      console.error(error)
      setApiData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => fetchData()

  return (
    <>
      <Header />

      <FilterBar
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        costCenter={costCenter}
        setCostCenter={setCostCenter}
        issued={issued}
        setIssued={setIssued}
        onSearch={handleSearch}
      />

      <InfoCards apiData={apiData} loading={loading} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1rem 1rem' }}>
        <PeriodChart apiData={apiData} loading={loading} />
        <ResultTable apiData={apiData} loading={loading} />
      </div>
    </>
  )
}
