import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies, IMAGE_BASE } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Search
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMovies = async (pageNumber: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    const data = await getPopularMovies(pageNumber);

    if (!Array.isArray(data) || data.length === 0) {
      setHasMore(false);
    } else {
      setMovies(prev => [...prev, ...data]);
      setPage(pageNumber);
    }

    setLoading(false);
  };

  const loadMore = () => {
    if (!loading && hasMore && query.length < 3) {
      loadMovies(page + 1);
    }
  };

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length < 3) {
      setSearchResults([]);
      return;
    }

    const data = await searchMovies(text);
    setSearchResults(Array.isArray(data) ? data : []);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
    Keyboard.dismiss();
  };

  const dataToShow = query.length >= 3 ? searchResults : movies;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <Text style={styles.header}>Popular Movies</Text>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9ca3af" />

          <TextInput
            placeholder="Search movies..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />

          {query.length > 0 && (
            <Pressable onPress={clearSearch}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </Pressable>
          )}
        </View>
      </SafeAreaView>

      {/* Movie List */}
      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: 16 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loading && query.length < 3 ? (
            <Text style={styles.loading}>Loading more...</Text>
          ) : null
        }
        renderItem={({ item }) => {
          if (!item.poster_path) return null;

          const liked = isFavorite(item.id);

          return (
            <MovieCard
              title={item.title}
              rating={item.vote_average.toFixed(1)}
              image={`${IMAGE_BASE}${item.poster_path}`}
              liked={liked}
              onLikePress={() =>
                liked
                  ? removeFromFavorites(item.id)
                  : addToFavorites(item)
              }
              onPress={() =>
                navigation.navigate("Details", { id: item.id })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingBottom: 15,
    color: "#111827",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 15,
    paddingHorizontal: 14,
    height: 44,
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#111827",
  },
  loading: {
    textAlign: "center",
    paddingVertical: 16,
    color: "#6b7280",
  },
});
