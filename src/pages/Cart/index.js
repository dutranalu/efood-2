import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LightButton,
  InverseOutlineButton,
} from '../../styles/components';
import { removeItem } from '../../store/cartSlice';

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

const ItemImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
`;

const ItemTitle = styled.h4`
  font-size: 14px;
`;

const ItemPrice = styled.span`
  font-weight: 700;
  font-size: 12px;
`;

const Quantity = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;

const RemoveButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  text-align: left;
  padding: 0;
  margin-top: 4px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const lastRestaurantId = useSelector(
    (state) => state.order.lastRestaurantId
  );
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <Overlay className="panel-overlay">
      <Panel className="panel">
        <h3>Carrinho</h3>
        {items.length === 0 && <p>Seu carrinho esta vazio.</p>}
        {items.map((item) => (
          <Item key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <div>
              <ItemTitle>{item.name}</ItemTitle>
              <Quantity>Qtd: {item.quantity}</Quantity>
              <ItemPrice>{formatPrice(item.price)}</ItemPrice>
              <RemoveButton onClick={() => dispatch(removeItem(item.id))}>
                Remover
              </RemoveButton>
            </div>
          </Item>
        ))}
        <Total>
          <span>Valor total</span>
          <span>{formatPrice(total)}</span>
        </Total>
        <Link to="/entrega">
          <LightButton>Continuar com a entrega</LightButton>
        </Link>
        <Link to={lastRestaurantId ? `/perfil/${lastRestaurantId}` : '/'}>
          <InverseOutlineButton>Voltar para o cardapio</InverseOutlineButton>
        </Link>
      </Panel>
    </Overlay>
  );
}

export default Cart;
