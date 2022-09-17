import { FC } from "react";
import { Card, Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";
type Props = {
  favoritesPokemons: number[];
}

export const FavoritePokemons: FC<Props> = ({ favoritesPokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favoritesPokemons.map(id =>
        <FavoriteCardPokemon id={id} key={id} />
      )}
    </Grid.Container>
  )
}
