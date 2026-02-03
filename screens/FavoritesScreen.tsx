import { FlatList, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { IMAGE_BASE } from "../api/tmdb";

export default function FavoritesScreen({ navigation }: any) {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Text style={styles.header}>Favorite Movies</Text>

        <View style={styles.center}>
          <Text>No favorite movies yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favorite Movies</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            rating={item.vote_average.toFixed(1)}
            image={`${IMAGE_BASE}${item.poster_path}`}
            liked={true}
            onLikePress={() => removeFromFavorites(item.id)}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          />
        )}
      />
    </SafeAreaView>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
