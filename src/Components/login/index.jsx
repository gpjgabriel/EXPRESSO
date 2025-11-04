'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Styled from './styles.js';
import { useUser  } from '@/context/UserContext';
import { Skeleton } from 'primereact/skeleton';


export default function Login() {
  const router = useRouter();
  const { updateUser } = useUser ();

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => {
    if (!name.trim() || !department.trim()) {
      alert(
        'Você não informou nome e/ou departamento. Será usado o usuário padrão: Nome: Admin, Departamento: Financeiro.'
      );
    }

      updateUser(name || 'Admin', department || 'Financeiro');
      router.push('/dashboard');
  };

  return (
    <Styled.Container>
      <Styled.ContentCard>
        {loading ? (
          <>
            <Skeleton height="5rem" className="mb-6" />
            <Styled.FormGroup>
              <Skeleton height="2.5rem" />
              <Skeleton height="2.5rem" />
            </Styled.FormGroup>
            <Skeleton height="2.5rem" />
          </>
        ) : (
          <>
            <Styled.Title>Teste Técnico - Expresso Consultoria</Styled.Title>

            <Styled.FormGroup>
              <Styled.StyledInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
              />
              <Styled.StyledInput
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Departamento"
              />
            </Styled.FormGroup>

            <Styled.StyledButton onClick={handleNavigate}>
              Acessar Dashboard
            </Styled.StyledButton>
          </>
        )}
      </Styled.ContentCard>
    </Styled.Container>
  );
}