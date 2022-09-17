import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from '../../components/ui/FavoritePokemons';


const FavoritesPage: NextPage = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layout title="Pokemon Favoritos">
      {favoritesPokemons.length
        ? (
          <FavoritePokemons favoritesPokemons={favoritesPokemons} />
        )
        : (<NoFavorites />)}
    </Layout>
  );
};

export default FavoritesPage;
