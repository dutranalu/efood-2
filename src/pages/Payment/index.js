import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Label,
  LightButton,
  InverseOutlineButton,
} from '../../styles/components';
import { setOrderId, setPayment } from '../../store/orderSlice';
import { clearCart } from '../../store/cartSlice';

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
  gap: 12px;

  a {
    width: 100%;
  }

  button {
    width: 100%;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Actions = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 8px;
`;

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const delivery = useSelector((state) => state.order.delivery);
  const cartItems = useSelector((state) => state.cart.items);
  const savedPayment = useSelector((state) => state.order.payment);
  const lastRestaurantId = useSelector(
    (state) => state.order.lastRestaurantId
  );
  const [form, setForm] = useState({
    name: savedPayment.name,
    number: savedPayment.number,
    code: savedPayment.code,
    expiresMonth: savedPayment.expiresMonth,
    expiresYear: savedPayment.expiresYear,
  });
  const [loading, setLoading] = useState(false);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const formatPrice = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    dispatch(setPayment(form));

    const body = {
      products: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
      })),
      delivery: {
        receiver: delivery.receiver,
        address: {
          description: delivery.address,
          city: delivery.city,
          zipCode: delivery.zipCode,
          number: Number(delivery.number),
          complement: delivery.complement,
        },
      },
      payment: {
        card: {
          name: form.name,
          number: form.number,
          code: Number(form.code),
          expires: {
            month: Number(form.expiresMonth),
            year: Number(form.expiresYear),
          },
        },
      },
    };

    try {
      const response = await fetch(
        'https://api-ebac.vercel.app/api/efood/checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao finalizar pagamento');
      }

      const data = await response.json();
      dispatch(setOrderId(data.orderId));
      dispatch(clearCart());
      navigate('/confirmacao');
    } catch (error) {
      alert('Nao foi possivel finalizar o pagamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay className="panel-overlay">
      <Panel className="panel">
        <Title>
          Pagamento - Valor a pagar {formatPrice(total)}
        </Title>
        <Field>
          <Label>Nome no cartao</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Joao Paulo de Souza"
          />
        </Field>
        <Row>
          <Field>
            <Label>Numero do cartao</Label>
            <Input
              name="number"
              value={form.number}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>CVV</Label>
            <Input
              name="code"
              value={form.code}
              onChange={handleChange}
            />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Mes de vencimento</Label>
            <Input
              name="expiresMonth"
              value={form.expiresMonth}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Ano de vencimento</Label>
            <Input
              name="expiresYear"
              value={form.expiresYear}
              onChange={handleChange}
            />
          </Field>
        </Row>
        <Actions>
          <LightButton onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar pagamento'}
          </LightButton>
          <Link to="/entrega">
            <InverseOutlineButton>
              Voltar para a edicao de endereco
            </InverseOutlineButton>
          </Link>
          <Link to={lastRestaurantId ? `/perfil/${lastRestaurantId}` : '/'}>
            <InverseOutlineButton>Voltar para o cardapio</InverseOutlineButton>
          </Link>
        </Actions>
      </Panel>
    </Overlay>
  );
}

export default Payment;
