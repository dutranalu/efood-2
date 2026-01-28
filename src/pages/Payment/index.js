import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Input,
  Label,
  LightButton,
  InverseOutlineButton,
} from '../../styles/components';

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

function Payment() {
  return (
    <Overlay>
      <Panel>
        <Title>Pagamento - Valor a pagar R$ 190,90</Title>
        <Field>
          <Label>Nome no cartao</Label>
          <Input placeholder="Joao Paulo de Souza" />
        </Field>
        <Row>
          <Field>
            <Label>Numero do cartao</Label>
            <Input />
          </Field>
          <Field>
            <Label>CVV</Label>
            <Input />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Mes de vencimento</Label>
            <Input />
          </Field>
          <Field>
            <Label>Ano de vencimento</Label>
            <Input />
          </Field>
        </Row>
        <Actions>
          <Link to="/confirmacao">
            <LightButton>Finalizar pagamento</LightButton>
          </Link>
          <Link to="/entrega">
            <InverseOutlineButton>
              Voltar para a edicao de endereco
            </InverseOutlineButton>
          </Link>
        </Actions>
      </Panel>
    </Overlay>
  );
}

export default Payment;
