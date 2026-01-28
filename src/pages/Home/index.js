import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, PrimaryButton } from '../../styles/components';

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 32px 0 40px;
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

const HeroContent = styled(Container)`
  display: grid;
  justify-items: center;
  gap: 16px;
`;

const HeroText = styled.p`
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  max-width: 520px;
`;

const CardsSection = styled.section`
  padding: 40px 0 80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #f2c7c7;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
`;

const CardMedia = styled.div`
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
`;

const CardBody = styled.div`
  padding: 16px;
  display: grid;
  gap: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
`;

const Rating = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 12px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
`;

const CardText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};
`;

const BadgeGroup = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 24px 0 48px;
  text-align: center;
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: inline-block;
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

const getTagsFromMenu = (menu = []) => {
  const hasSweet = menu.some((item) =>
    sweetKeywords.some((word) =>
      item.nome?.toLowerCase().includes(word)
    )
  );
  const hasSavory = menu.some(
    (item) =>
      !sweetKeywords.some((word) =>
        item.nome?.toLowerCase().includes(word)
      )
  );

  if (hasSweet && hasSavory) return ['Salgada', 'Doce'];
  if (hasSweet) return ['Doce'];
  return ['Salgada'];
};

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadRestaurants = async () => {
      try {
        const response = await fetch(
          'https://api-ebac.vercel.app/api/efood/restaurantes'
        );
        if (!response.ok) {
          throw new Error('Erro ao carregar restaurantes');
        }
        const data = await response.json();
        if (isMounted) {
          setRestaurants(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Nao foi possivel carregar os restaurantes.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRestaurants();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = useMemo(
    () =>
      restaurants
        .filter((item) =>
          item.tipo?.toLowerCase().includes('pizz')
        )
        .map((item) => ({
        id: item.id,
        name: item.titulo,
        desc: item.descricao,
        rating: item.avaliacao,
        image: item.capa,
        tags: [
          ...(item.destacado ? ['Destaque da semana'] : []),
          ...getTagsFromMenu(item.cardapio),
        ],
      })),
    [restaurants]
  );

  return (
    <Page>
      <Hero>
        <HeroContent>
          <Logo>efood</Logo>
          <HeroText>
            Viva experiencias gastronomicas no conforto da sua casa
          </HeroText>
        </HeroContent>
      </Hero>

      <CardsSection>
        <Container>
          {loading && <p>Carregando restaurantes...</p>}
          {!loading && error && <p>{error}</p>}
          {!loading && !error && (
            <>
              {cards.length === 0 && (
                <p>Nao encontramos pizzarias no momento.</p>
              )}
              {cards.length > 0 && (
                <Grid>
                  {cards.map((item) => (
                    <Card key={item.id}>
                      <CardMedia>
                        <CardImage src={item.image} alt={item.name} />
                        <BadgeGroup>
                          {item.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </BadgeGroup>
                      </CardMedia>
                      <CardBody>
                        <CardHeader>
                          <CardTitle>{item.name}</CardTitle>
                          <Rating>{item.rating} *</Rating>
                        </CardHeader>
                        <CardText>{item.desc}</CardText>
                        <Link to={`/perfil/${item.id}`}>
                          <PrimaryButton>Saiba mais</PrimaryButton>
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Container>
      </CardsSection>

      <Footer>
        <Logo>efood</Logo>
        <Social>
          <Dot />
          <Dot />
          <Dot />
        </Social>
      </Footer>
    </Page>
  );
}

export default Home;
