import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  LightButton,
  InverseOutlineButton,
} from '../../styles/components';
import { addItem } from '../../store/cartSlice';

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const TopBar = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 24px 0;
`;

const TopBarContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`;

const Logo = styled.div`
  width: 112px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  place-items: center;
  font-weight: 900;
  text-transform: lowercase;
`;

const Hero = styled.section`
  background: ${({ $image }) =>
    $image
      ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${$image})`
      : 'linear-gradient(120deg, #0d0d0d, #3b3b3b)'};
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 56px 0;
`;

const HeroContent = styled(Container)`
  display: grid;
  gap: 6px;
`;

const HeroTag = styled.span`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

const HeroTitle = styled.h1`
  font-size: 32px;
`;

const MenuSection = styled.section`
  padding: 40px 0 80px;
`;

const MenuBlock = styled.div`
  display: grid;
  gap: 20px;

  & + & {
    margin-top: 32px;
  }
`;

const MenuTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 12px;
  display: grid;
  gap: 10px;
  min-height: 300px;
`;

const CardImage = styled.img`
  height: 120px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  display: block;
`;

const CardTitle = styled.h3`
  font-size: 16px;
`;

const CardText = styled.p`
  font-size: 12px;
  opacity: 0.9;
`;

const CardCategory = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.85;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  place-items: center;
  padding: 24px;
  z-index: 10;
`;

const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 20px;
  max-width: 720px;
  width: 100%;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  position: relative;
`;

const ModalImage = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  display: block;
`;

const ModalContent = styled.div`
  display: grid;
  gap: 12px;
  font-size: 12px;
`;

const ModalActions = styled.div`
  display: grid;
  gap: 8px;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
`;

const sweetKeywords = [
  'chocolate',
  'doce',
  'banana',
  'brigadeiro',
  'romeu',
  'morango',
  'nutella',
  'caramelo',
];

const formatPrice = (value) =>
  `R$ ${Number(value).toFixed(2).replace('.', ',')}`;

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [open, setOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadRestaurant = async () => {
      try {
        const response = await fetch(
          'https://api-ebac.vercel.app/api/efood/restaurantes'
        );
        if (!response.ok) {
          throw new Error('Erro ao carregar restaurante');
        }
        const data = await response.json();
        const found = data.find((item) => String(item.id) === String(id));
        if (isMounted) {
          if (!found) {
            setError('Restaurante nao encontrado.');
          } else {
            setRestaurant(found);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Nao foi possivel carregar o restaurante.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRestaurant();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const menu = restaurant?.cardapio ?? [];
  const savory = useMemo(
    () =>
      menu.filter(
        (item) =>
          !sweetKeywords.some((word) =>
            item.nome?.toLowerCase().includes(word)
          )
      ),
    [menu]
  );
  const sweet = useMemo(
    () =>
      menu.filter((item) =>
        sweetKeywords.some((word) =>
          item.nome?.toLowerCase().includes(word)
        )
      ),
    [menu]
  );

  const handleBuy = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    dispatch(
      addItem({
        id: selectedItem.id,
        name: selectedItem.nome,
        price: Number(selectedItem.preco),
        image: selectedItem.foto,
      })
    );
    setOpen(false);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Page>
      <TopBar>
        <TopBarContent>
          <Link to="/">Restaurantes</Link>
          <Logo>efood</Logo>
          <Link to="/carrinho">
            {cartCount} produto(s) no carrinho
          </Link>
        </TopBarContent>
      </TopBar>

      {loading && <p>Carregando restaurante...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && restaurant && (
        <>
          <Hero $image={restaurant.capa}>
            <HeroContent>
              <HeroTag>{restaurant.tipo}</HeroTag>
              <HeroTitle>{restaurant.titulo}</HeroTitle>
            </HeroContent>
          </Hero>

          <MenuSection>
            <Container>
              <MenuBlock>
                <MenuTitle>Pizzas salgadas</MenuTitle>
                {savory.length === 0 && <p>Sem opcoes salgadas.</p>}
                <Grid>
                  {savory.map((item) => (
                    <Card key={item.id}>
                      <CardImage src={item.foto} alt={item.nome} />
                      <CardTitle>{item.nome}</CardTitle>
                      <CardCategory>Salgada</CardCategory>
                      <CardText>{item.descricao}</CardText>
                      <LightButton onClick={() => handleBuy(item)}>
                        Comprar o produto
                      </LightButton>
                    </Card>
                  ))}
                </Grid>
              </MenuBlock>

              <MenuBlock>
                <MenuTitle>Pizzas doces</MenuTitle>
                {sweet.length === 0 && <p>Sem opcoes doces.</p>}
                <Grid>
                  {sweet.map((item) => (
                    <Card key={item.id}>
                      <CardImage src={item.foto} alt={item.nome} />
                      <CardTitle>{item.nome}</CardTitle>
                      <CardCategory>Doce</CardCategory>
                      <CardText>{item.descricao}</CardText>
                      <LightButton onClick={() => handleBuy(item)}>
                        Comprar o produto
                      </LightButton>
                    </Card>
                  ))}
                </Grid>
              </MenuBlock>
            </Container>
          </MenuSection>
        </>
      )}

      <ModalOverlay $open={open}>
        <ModalCard>
          <div>
            {selectedItem && (
              <ModalImage src={selectedItem.foto} alt={selectedItem.nome} />
            )}
          </div>
          <ModalContent>
            <h2>{selectedItem?.nome}</h2>
            <p>{selectedItem?.descricao}</p>
            <p>Serve: {selectedItem?.porcao}</p>
            <ModalActions>
              <LightButton onClick={handleAddToCart}>
                Comprar o produto - {formatPrice(selectedItem?.preco ?? 0)}
              </LightButton>
              <InverseOutlineButton onClick={() => setOpen(false)}>
                Fechar
              </InverseOutlineButton>
            </ModalActions>
          </ModalContent>
          <ModalClose onClick={() => setOpen(false)}>x</ModalClose>
        </ModalCard>
      </ModalOverlay>
    </Page>
  );
}

export default Profile;
