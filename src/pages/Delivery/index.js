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

function Delivery() {
  return (
    <Overlay>
      <Panel>
        <Title>Entrega</Title>
        <Field>
          <Label>Quem ira receber</Label>
          <Input placeholder="Joao Paulo de Souza" />
        </Field>
        <Field>
          <Label>Endereco</Label>
          <Input />
        </Field>
        <Field>
          <Label>Cidade</Label>
          <Input />
        </Field>
        <Row>
          <Field>
            <Label>CEP</Label>
            <Input />
          </Field>
          <Field>
            <Label>Numero</Label>
            <Input />
          </Field>
        </Row>
        <Field>
          <Label>Complemento (opcional)</Label>
          <Input />
        </Field>
        <Actions>
          <Link to="/pagamento">
            <LightButton>Continuar com o pagamento</LightButton>
          </Link>
          <Link to="/carrinho">
            <InverseOutlineButton>Voltar para o carrinho</InverseOutlineButton>
          </Link>
        </Actions>
      </Panel>
    </Overlay>
  );
}

export default Delivery;
