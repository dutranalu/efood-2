import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LightButton, InverseOutlineButton } from '../../styles/components';

const Overlay = styled.main`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  justify-content: end;
`;

const Panel = styled.section`
  width: 360px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  display: grid;
  gap: 16px;

  a {
    width: 100%;
  }

  button {
    width: 100%;
  }
`;

const Item = styled.div`
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 6px;
  padding: 10px;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 10px;
`;

const ItemImage = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(120deg, #d9d9d9, #ffffff);
  border-radius: 6px;
`;

const ItemTitle = styled.h4`
  font-size: 14px;
`;

const ItemPrice = styled.span`
  font-weight: 700;
  font-size: 12px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

function Cart() {
  return (
    <Overlay>
      <Panel>
        <h3>Carrinho</h3>
        <Item>
          <ItemImage />
          <div>
            <ItemTitle>Pizza Marguerita</ItemTitle>
            <ItemPrice>R$ 60,90</ItemPrice>
          </div>
        </Item>
        <Item>
          <ItemImage />
          <div>
            <ItemTitle>Pizza Calabresa</ItemTitle>
            <ItemPrice>R$ 58,90</ItemPrice>
          </div>
        </Item>
        <Total>
          <span>Valor total</span>
          <span>R$ 119,80</span>
        </Total>
        <Link to="/entrega">
          <LightButton>Continuar com a entrega</LightButton>
        </Link>
        <Link to="/perfil/1">
          <InverseOutlineButton>Voltar para o cardapio</InverseOutlineButton>
        </Link>
      </Panel>
    </Overlay>
  );
}

export default Cart;
