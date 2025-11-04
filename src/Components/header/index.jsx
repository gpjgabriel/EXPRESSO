'use client';

import * as Styled from './styles.js';
import { useUser } from '@/context/UserContext';
import { Skeleton } from 'primereact/skeleton';


export default function Header() {
  const { user } = useUser();

  const isLoading = !user.name;

  const menuItems = [
    { label: 'Adicionar', icon: 'pi pi-plus' },
    { label: 'Contas à Pagar', icon: 'pi pi-arrow-down' },
    { label: 'Contas à Receber', icon: 'pi pi-arrow-up' },
    { label: 'Relatórios', icon: 'pi pi-chart-bar' },
  ];

  return (
    <Styled.Header>
      <Styled.Nav>
        <Styled.LeftMenu>
          {menuItems.map((item, index) => (
            <Styled.NavButton
              key={index}
              label={isLoading ? <Skeleton width="60px" height="1rem" /> : item.label}
              icon={item.icon}
              className="p-button-text"
            />
          ))}
        </Styled.LeftMenu>
        <Styled.RightMenu>
          {isLoading ? (
            <Skeleton width="2rem" height="2rem" shape="circle" />
          ) : (
            <Styled.NavButton icon="pi pi-search" className="p-button-text" style={{ fontSize: '2rem' }} />
          )}

          {isLoading ? (
            <Skeleton width="2rem" height="2rem" shape="circle" />
          ) : (
            <Styled.NavButton icon="pi pi-cog" className="p-button-text" />
          )}

          <Styled.UserInfo>
            {isLoading ? (
              <>
                <Skeleton width="60px" height="0.9rem" />
                <Skeleton width="80px" height="0.7rem" />
                <Skeleton width="2.5rem" height="2.5rem" shape="circle" />
              </>
            ) : (
              <>
                <div className='user-details'>
                  <span className='user-name'>{user.name}</span>
                  <span className='user-department'>{user.department}</span>
                </div>
                <Styled.UserAvatar label={user.name.charAt(0).toUpperCase()} size="large" />
              </>
            )}
          </Styled.UserInfo>
        </Styled.RightMenu>
      </Styled.Nav>
    </Styled.Header>
  );
}