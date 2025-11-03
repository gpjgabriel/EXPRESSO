'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Styled from './login.js';
import { useUser  } from '@/context/UserContext';


export default function Login() {
  const router = useRouter();
  const { updateUser } = useUser ();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleNavigate = () => {
    if (!name.trim() || !department.trim()) {
      alert('Por favor, preencha seu nome e departamento.');
      return;
    }

    updateUser(name, department);

    router.push('/dashboard');
  };

  return (
    <Styled.Container>
      <Styled.ContentCard>
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

        <Styled.StyledButton onClick={handleNavigate}>Acessar Dashboard</Styled.StyledButton>
      </Styled.ContentCard>
    </Styled.Container>
  );
}