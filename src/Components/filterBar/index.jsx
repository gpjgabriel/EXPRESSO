'use client';

import * as Styled from './styles.js';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import useFinanceData from '@/hooks/useFinanceData.js';
import LoadingFilterBar from './loading.js';


export default function FilterBar({ onDateChange }) {
  const [dataStart, setDataStart] = useState(null);
  const [dataEnd, setDataEnd] = useState(null);
  const [emitidos, setEmitidos] = useState(false);
  const [allCenters, setAllCenters] = useState([]);
  const [center, setCenter] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  
  const { data, loading: hookLoading } = useFinanceData(dataStart, dataEnd);

  useEffect(() => {
    if (!hookLoading) {
      const uniqueCenters = Array.from(
        new Set(data.map(item => item.centroCusto))
      ).map(label => ({ label, value: label }));

      setAllCenters(uniqueCenters);
      setLocalLoading(false);
    }
  }, [data, hookLoading]);


  useEffect(() => {
    if (onDateChange) {
      setLocalLoading(true);
      onDateChange(dataStart, dataEnd);
    }
  }, [dataStart, dataEnd, onDateChange]);

  if (localLoading) return <LoadingFilterBar />;

  return (
    <Styled.FilterContainer>
      <div className="filters-left">
        <Styled.BackButton icon="pi pi-chevron-left" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='input-label'>Centro de custo:</label>
          <Dropdown
            value={center}
            onChange={(e) => setCenter(e.value)}
            options={allCenters}
            scrollHeight="200px"
            virtualScrollerOptions={{ itemSize: 38 }}
            placeholder="Selecione"
            style={{minWidth: '200px'}}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='input-label'>Data inicial:</label>
          <Styled.CalendarInput
            value={dataStart}
            onChange={(e) => setDataStart(e.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            placeholder="dd/mm/aaaa"
            showIcon 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='input-label'>Data final:</label>
          <Styled.CalendarInput
            value={dataEnd}
            onChange={(e) => setDataEnd(e.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            placeholder="dd/mm/aaaa"
            showIcon 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Checkbox style={{marginRight: '0.25rem'}} checked={emitidos} onChange={(e) => setEmitidos(e.checked)} />
          <label className='input-label'>Emitidos</label>
        </div>
      </div>

      <div className='button-container'>
        <Styled.PdfButton icon="pi pi-file-pdf" label="PDF" />
        <Styled.FilterButton icon="pi pi-search" label="Pesquisar" />
      </div>
    </Styled.FilterContainer>
  );
}
