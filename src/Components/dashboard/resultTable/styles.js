import styled from 'styled-components';

export const TableWrapper = styled.div`
  .p-datatable {
    border-radius: 6px;
    overflow: hidden;
  }

  .p-datatable .p-datatable-tbody > tr {
    font-weight: 600;
    color: #6b7280;
  }

  .p-datatable-thead > tr > th {
    background-color: #d1d5db !important;
    color: #4b5563;
    text-align: center;
    padding: 0.75rem 0.5rem;
  }

  .p-datatable-tbody > tr > td {
    text-align: center;
    vertical-align: middle;
    padding: 0.75rem 0.5rem;
  }

  .p-datatable-tfoot > tr > td {
    background-color: #6b21a8 !important;
    color: #ffffff;
    font-weight: 600;
    text-align: center;
    padding: 0.75rem 0.5rem;
  }
`;
