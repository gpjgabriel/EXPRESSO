'use client';

import * as Styled from './styles.js';
import { useUser } from '@/context/UserContext';
import Loading from './loading.js';


export default function Header() {
  const { user } = useUser();

  const menuItems = [
    { label: 'Adicionar', icon: 'pi pi-plus' },
    { label: 'Contas à Pagar', icon: 'pi pi-arrow-down' },
    { label: 'Contas à Receber', icon: 'pi pi-arrow-up' },
    { label: 'Relatórios', icon: 'pi pi-chart-bar' },
  ];

  if (!user.name) return <Loading />;

  return (
    <Styled.Header>
      <Styled.Nav>
        <Styled.LeftMenu>
          {menuItems.map((item, index) => (
            <Styled.NavButton
              key={index}
              label={item.label}
              icon={item.icon}
              className="p-button-text"
            />
          ))}
        </Styled.LeftMenu>
        <Styled.RightMenu>
            <Styled.NavButton icon="pi pi-search" className="p-button-text" style={{ fontSize: '2rem' }} />
            <Styled.NavButton icon="pi pi-cog" className="p-button-text" />
          <Styled.UserInfo>
            <div className='user-details'>
              <span className='user-name'>{user.name}</span>
              <span className='user-department'>{user.department}</span>
            </div>
            <Styled.UserAvatar label={user.name.charAt(0).toUpperCase()} size="large" />
          </Styled.UserInfo>
        </Styled.RightMenu>
      </Styled.Nav>
    </Styled.Header>
  );
}