import styled from 'styled-components';

export const TableWrapper = styled.div`
  flex: 1;

  .p-datatable {
    border-radius: 10px;
    overflow: hidden;
  }

  .p-datatable-thead > tr > th {
    background-color: #f3f4f6 !important;
    color: #111827;
    font-weight: 600;
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
    font-weight: 700;
    text-align: center;
    padding: 0.75rem 0.5rem;
  }
`;
