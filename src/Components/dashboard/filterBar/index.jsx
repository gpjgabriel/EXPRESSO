'use client'

import * as Styled from './styles.js'
import { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'
import LoadingFilterBar from './loading.js'

const ITEM_SIZE = 38

export default function FilterBar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  costCenter,
  setCostCenter,
  issued,
  setIssued,
  onSearch,
}) {
  const [costCenterOptions, setCostCenterOptions] = useState([])
  const [totalCostCenters, setTotalCostCenters] = useState(0)
  const [loading, setLoading] = useState(true)

  // Carrega os Centros de Custo (infinite scroll)
  const loadCostCenters = async event => {
    setLoading(true)

    const { first, rows } = event

    try {
      const res = await fetch(`/api/cost-centers?skip=${first}&take=${rows}`)
      const data = await res.json()

      const newOptions = [...costCenterOptions]
      Array.from({ length: data.items.length }).forEach((_, i) => {
        newOptions[first + i] = data.items[i]
      })

      setCostCenterOptions(newOptions)
      setTotalCostCenters(data.total)
    } catch (error) {
      console.error('Falha ao carregar centros de custo', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/cost-centers?skip=0&take=${ITEM_SIZE}`)
        const data = await res.json()

        const options = Array.from({ length: data.total })
        data.items.forEach((item, index) => {
          options[index] = item
        })

        setCostCenterOptions(options)
        setTotalCostCenters(data.total)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    fetchInitial()
  }, [])

  if (loading && totalCostCenters === 0) return <LoadingFilterBar />

  return (
    <Styled.FilterContainer>
      <div className="filters-left">
        <Styled.BackButton icon="pi pi-chevron-left" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="input-label">Centro de custo:</label>
          <Dropdown
            value={costCenter}
            onChange={e => setCostCenter(e.value)}
            options={costCenterOptions}
            optionLabel="name"
            placeholder="Selecione"
            style={{ minWidth: '200px' }}
            lazy={true}
            virtualScrollerOptions={{
              itemSize: ITEM_SIZE,
              totalRecords: totalCostCenters,
              onLazyLoad: loadCostCenters,
              showLoader: true,
              loading: loading,
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="input-label">Data inicial:</label>
          <Styled.CalendarInput
            value={startDate}
            onChange={e => setStartDate(e.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            placeholder="dd/mm/aaaa"
            showIcon
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="input-label">Data final:</label>
          <Styled.CalendarInput
            value={endDate}
            onChange={e => setEndDate(e.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            placeholder="dd/mm/aaaa"
            showIcon
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Checkbox style={{ marginRight: '0.25rem' }} checked={issued} onChange={e => setIssued(e.checked)} />
          <label className="input-label">Emitidos</label>
        </div>
      </div>

      <div className="button-container">
        <Styled.PdfButton icon="pi pi-file-pdf" label="PDF" />
        <Styled.FilterButton icon="pi pi-search" label="Pesquisar" onClick={onSearch} />
      </div>
    </Styled.FilterContainer>
  )
}
