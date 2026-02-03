const API_KEY = "bd606ef215bd998724e1903cf648453b";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data?.results || [];
  } catch (error) {
    console.log("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async (query: string) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    return data?.results || [];
  } catch (error) {
    console.log("Error searching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    return null;
  }
};
