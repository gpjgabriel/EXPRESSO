import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

export const Header = styled.header`
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const Nav = styled.nav`
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftMenu = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const NavButton = styled(Button)`
  background: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  transition: color 0.2s;

  .pi {
    font-size: 1.1rem;
    font-weight: 600;
    -webkit-text-stroke: 1px currentColor;
  }

  &:hover {
    color: #7c3aed;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .user-name {
    color: #374151;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .user-department {
    color: #6b7280;
    font-size: 0.85rem;
  }
`;

export const UserAvatar = styled(Avatar)`
    background: #ede9fe;
    color: #5b21b6;
  font-weight: 600;
  text-transform: uppercase;
`;