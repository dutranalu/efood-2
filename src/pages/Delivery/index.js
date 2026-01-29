import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Label,
  LightButton,
  InverseOutlineButton,
} from '../../styles/components';
import { setDelivery } from '../../store/orderSlice';

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

function Delivery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedDelivery = useSelector((state) => state.order.delivery);
  const [form, setForm] = useState({
    receiver: savedDelivery.receiver,
    address: savedDelivery.address,
    city: savedDelivery.city,
    zipCode: savedDelivery.zipCode,
    number: savedDelivery.number,
    complement: savedDelivery.complement,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    dispatch(setDelivery(form));
    navigate('/pagamento');
  };

  return (
    <Overlay>
      <Panel>
        <Title>Entrega</Title>
        <Field>
          <Label>Quem ira receber</Label>
          <Input
            name="receiver"
            value={form.receiver}
            onChange={handleChange}
            placeholder="Joao Paulo de Souza"
          />
        </Field>
        <Field>
          <Label>Endereco</Label>
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>Cidade</Label>
          <Input
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </Field>
        <Row>
          <Field>
            <Label>CEP</Label>
            <Input
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Numero</Label>
            <Input
              name="number"
              value={form.number}
              onChange={handleChange}
            />
          </Field>
        </Row>
        <Field>
          <Label>Complemento (opcional)</Label>
          <Input
            name="complement"
            value={form.complement}
            onChange={handleChange}
          />
        </Field>
        <Actions>
          <LightButton onClick={handleContinue}>
            Continuar com o pagamento
          </LightButton>
          <Link to="/carrinho">
            <InverseOutlineButton>Voltar para o carrinho</InverseOutlineButton>
          </Link>
        </Actions>
      </Panel>
    </Overlay>
  );
}

export default Delivery;
