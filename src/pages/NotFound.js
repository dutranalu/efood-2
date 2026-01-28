import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 12px;
`;

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

function NotFound() {
  return (
    <Wrapper>
      <div>
        <Title>404</Title>
        <p>Pagina nao encontrada.</p>
        <HomeLink to="/">Voltar para a home</HomeLink>
      </div>
    </Wrapper>
  );
}

export default NotFound;
