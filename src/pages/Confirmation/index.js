import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LightButton } from '../../styles/components';

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

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 12px;
  line-height: 1.4;
`;

function Confirmation() {
  const orderId = useSelector((state) => state.order.orderId);

  return (
    <Overlay>
      <Panel>
        <Title>Pedido realizado - {orderId || 'SEM_ID'}</Title>
        <Text>
          Estamos felizes em informar que seu pedido ja esta em processo de
          preparacao e, em breve, sera entregue no endereco fornecido.
        </Text>
        <Text>
          Gostariamos de ressaltar que nossos entregadores nao estao autorizados
          a realizar cobrancas extras.
        </Text>
        <Text>
          Lembre-se da importancia de higienizar as maos apos o recebimento do
          pedido, garantindo assim sua seguranca e bem-estar durante a refeicao.
        </Text>
        <Text>
          Esperamos que desfrute de uma deliciosa e agradavel experiencia
          gastronomica. Bom apetite!
        </Text>
        <Link to="/">
          <LightButton>Concluir</LightButton>
        </Link>
      </Panel>
    </Overlay>
  );
}

export default Confirmation;
