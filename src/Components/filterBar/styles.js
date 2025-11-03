import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  margin: 1rem;
  flex-wrap: wrap;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  .input-label {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .button-container {
    display: flex;
    gap: 0.5rem;
  }
`;

export const BackButton = styled(Button)`
  background-color: #ede9fe;
  color: #4c1d95;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
`;

export const CalendarInput = styled(Calendar)`
    min-width: 150px;
`;

export const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;