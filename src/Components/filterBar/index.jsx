'use client';

import * as Styled from './styles.js';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';


export default function FilterBar({ onDateChange }) {
  const [center, setCenter] = useState(null);
  const [dataStart, setDataStart] = useState(null);
  const [dataEnd, setDataEnd] = useState(null);
  const [emitidos, setEmitidos] = useState(false);

  const centers = Array.from({ length: 50 }, (_, i) => ({
    label: `Centro ${i + 1}`,
    value: `center-${i + 1}`
  }));

  useEffect(() => {
    if (onDateChange) {
      onDateChange(dataStart, dataEnd);
    }
  }, [dataStart, dataEnd, onDateChange]);

  return (
    <Styled.FilterContainer>
      <Styled.BackButton icon="pi pi-chevron-left" />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label className='input-label'>Centro de custo:</label>
        <Dropdown
          value={center}
          onChange={(e) => setCenter(e.value)}
          options={centers}
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

      <div className='button-container'>
        <Styled.FilterButton icon="pi pi-file-pdf" label="PDF" />
        <Styled.FilterButton icon="pi pi-search" label="Pesquisar" />
      </div>
    </Styled.FilterContainer>
  );
}
