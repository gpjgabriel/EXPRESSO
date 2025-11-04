'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import * as Styled from './styles.js';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';

const MOCK_DATA = [
  { nome: 'Carlos Silva', despesa: 1200, receita: 2500 },
  { nome: 'Ana Souza', despesa: 800, receita: 1800 },
  { nome: 'João Pereira', despesa: 1500, receita: 2100 },
  { nome: 'Mariana Costa', despesa: 1000, receita: 900 },
  { nome: 'Rafael Lima', despesa: 700, receita: 1200 },
  { nome: 'Danilo Silva', despesa: 1200, receita: 500 },
  { nome: 'Renato Souza', despesa: 800, receita: 1800 },
];

const getTotals = (data) => {
  const totalDespesa = data.reduce((acc, item) => acc + item.despesa, 0);
  const totalReceita = data.reduce((acc, item) => acc + item.receita, 0);
  const totalResultado = totalReceita - totalDespesa;
  return { totalDespesa, totalReceita, totalResultado };
};

export default function ResultTable() {
  const totals = getTotals(MOCK_DATA);

  const resultadoTemplate = (rowData) => {
    const resultado = rowData.receita - rowData.despesa;
    const isPositive = resultado >= 0;
    const icon = isPositive ? 'pi pi-arrow-up' : 'pi pi-arrow-down';
    const color = isPositive ? '#16a34a' : '#dc2626';

    return (
      <span style={{ color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
        R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <i className={icon}></i>
      </span>
    );
  };

  const despesaTemplate = (rowData) => (
    <>R$ {rowData.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</>
  );

  const receitaTemplate = (rowData) => (
    <>R$ {rowData.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</>
  );

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Total"
          footerStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#fff' }}
        />
        <Column
          footer={`R$ ${totals.totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          footerStyle={{ textAlign: 'center', color: '#fff' }}
        />
        <Column
          footer={`R$ ${totals.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          footerStyle={{ textAlign: 'center', color: '#fff' }}
        />
        <Column
          footer={`R$ ${totals.totalResultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          footerStyle={{ textAlign: 'center', color: '#fff' }}
        />
      </Row>
    </ColumnGroup>
  );

  return (
    <Styled.TableWrapper>
      <DataTable
        value={MOCK_DATA}
        footerColumnGroup={footerGroup}
      >
        <Column field="nome" header="Nome" />
        <Column field="despesa" header="Despesa" body={despesaTemplate} />
        <Column field="receita" header="Receita" body={receitaTemplate} />
        <Column header="Resultado" body={resultadoTemplate} />
      </DataTable>
    </Styled.TableWrapper>
  );
}
