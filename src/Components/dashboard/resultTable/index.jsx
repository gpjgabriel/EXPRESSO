'use client'

import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import * as Styled from './styles.js'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { ProgressBar } from 'primereact/progressbar'

export default function ResultTable({ apiData, loading }) {
  const grouped = Object.values(
    (apiData?.transactions || []).reduce((acc, item) => {
      const nome = item.user.name

      if (!acc[nome]) acc[nome] = { nome, receita: 0, despesa: 0 }

      if (item.type === 'RECEITA') {
        acc[nome].receita += item.value
      } else if (item.type === 'DESPESA') {
        acc[nome].despesa += item.value
      }
      return acc
    }, {}),
  )

  const totalDespesa = grouped.reduce((a, b) => a + b.despesa, 0)
  const totalReceita = grouped.reduce((a, b) => a + b.receita, 0)
  const totalResultado = totalReceita - totalDespesa

  const resultadoTemplate = rowData => {
    const resultado = rowData.receita - rowData.despesa
    const color = resultado >= 0 ? '#16a34a' : '#dc2626'
    const icon = resultado >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'
    return (
      <span style={{ color, display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
        R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <i className={icon}></i>
      </span>
    )
  }

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer="Total" />
        <Column footer={`R$ ${totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
        <Column footer={`R$ ${totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
        <Column footer={`R$ ${totalResultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
      </Row>
    </ColumnGroup>
  )

  return (
    <div style={{ flex: 1 }}>
      <Styled.TableWrapper>
        <DataTable
          value={grouped}
          footerColumnGroup={footerGroup}
          loading={loading}
          loadingIcon={<ProgressBar mode="indeterminate" style={{ height: '4px', width: '100%' }} />}
          emptyMessage="Nenhum registro encontrado"
          style={{ minWidth: '100%' }}
        >
          <Column field="nome" header="Nome" />
          <Column
            field="despesa"
            header="Despesa"
            body={d => `R$ ${d.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          />
          <Column
            field="receita"
            header="Receita"
            body={d => `R$ ${d.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          />
          <Column header="Resultado" body={resultadoTemplate} />
        </DataTable>
      </Styled.TableWrapper>
    </div>
  )
}
