'use client'

import Header from '@/Components/dashboard/header'
import FilterBar from '@/Components/dashboard/filterBar'
import InfoCards from '@/Components/dashboard/infoCards'
import PeriodChart from '@/Components/dashboard/periodChart'
import ResultTable from '@/Components/dashboard/resultTable'
import { useState, useEffect, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [costCenter, setCostCenter] = useState(null)
  const [issued, setIssued] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)

  const dashboardRef = useRef(null)

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

  const handleExportPDF = () => {
    const input = dashboardRef.current
    if (!input) {
      console.error('Erro ao exportar PDF.')
      return
    }
    const filterButtons = input.querySelector('.button-container')
    if (filterButtons) filterButtons.style.display = 'none'

    html2canvas(input, {
      scale: 2,
      useCORS: true,
    }).then(canvas => {
      if (filterButtons) filterButtons.style.display = 'flex'

      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('dashboard.pdf')
    })
  }

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
        onExportPDF={handleExportPDF}
      />

      <div ref={dashboardRef}>
        <InfoCards apiData={apiData} loading={loading} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1rem 1rem' }}>
          <PeriodChart apiData={apiData} loading={loading} />
          <ResultTable apiData={apiData} loading={loading} />
        </div>
      </div>
    </>
  )
}
