import styled from 'styled-components';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
  flex-wrap: wrap;

  .p-card .p-card-content {
    padding: 0;
  } 
`;

export const CardContent = styled(Card)`
  position: relative;
  flex: 1 1 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 150px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  background-color: #ffffff;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardValuesContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  .card-value-block {
    display: flex;
    flex-direction: column;
  }

  .value-label {
    font-size: 0.8rem;
    color: #6b7280;
  }

  .card-value {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const CardFooterBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 8px;
  width: 100%;
  border-radius: 0 0 10px 10px;
  margin-top: 1rem;
  background-color: ${({ color }) => color || '#000'};
`;