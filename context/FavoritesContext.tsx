import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type FavoritesContextType = {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // load
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem("favorites");
        if (data) setFavorites(JSON.parse(data));
      } catch {
        setFavorites([]);
      }
    };

    loadFavorites();
  }, []);

  // save 
  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    if (!favorites.find((m) => m.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((m) => m.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((m) => m.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorite Error");
  }
  return context;
};
