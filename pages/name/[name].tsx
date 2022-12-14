import { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti"
import { Layout } from "../../components/layouts";
import pokeApi from "../../api/pokeApi";
import { Pokemon } from "../../interfaces/pokemon-full";
import { localFavorites } from "../../utils";
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { getPokemonInfo } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState<boolean>(localFavorites.existInFavorites(pokemon.id));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites)

        if (isInFavorites) return;

        confetti({
            zIndex: 9999,
            particleCount: 150,
            spread: 140,
            angle: -100,
            origin: {
                x: 0.90,
                y: 0
            }
        })

    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: 5 }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: 30 }}>
                        <Card.Body>
                            <Card.Image
                                src={
                                    pokemon.sprites.other?.dream_world.front_default ||
                                    "/no-image.png"
                                }
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header
                            css={{ display: "flex", justifyContent: "space-between" }}
                        >
                            <Text h1 transform="capitalize">
                                {pokemon.name}
                            </Text>
                            <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorite}>
                                {isInFavorites ? 'En Favoritos' : " Guardar en favoritos"}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction="row" display="flex">
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

    return {
        paths: pokemonNames.map((name) => ({ params: { name } })),
        // fallback: false,
        fallback: 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    const pokemon = await getPokemonInfo(name.toLowerCase());
    
    //si el pokemon no existe se redirecciona a la paigna principal
    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon,
        },
    };
};

export default PokemonByNamePage;
