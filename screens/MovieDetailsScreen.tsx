import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMovieDetails, IMAGE_BASE } from "../api/tmdb";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieDetailsScreen({ route, navigation }: any) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const loadMovie = async () => {
      const data = await getMovieDetails(route.params.id);
      setMovie(data);
      setLoading(false);
    };
    loadMovie();
  }, []);


  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text>Unable to load movie details</Text>
      </View>
    );
  }

  const liked = isFavorite(movie.id);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
{/* poster*/}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: IMAGE_BASE + movie.poster_path }}
            style={styles.poster}
          />
          <View style={styles.overlay} />

{/* top icons*/}
          <SafeAreaView style={styles.topBar}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color="#ffffff" />
            </Pressable>

          </SafeAreaView>

{/* rating */}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>
              IMDb {movie.vote_average.toFixed(1)} / 10
            </Text>
          </View>
        </View>

{/* content */}
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          <Pressable
            style={styles.actionButton}
            onPress={() =>
              liked
                ? removeFromFavorites(movie.id)
                : addToFavorites(movie)
            }
          >
            <Text style={styles.actionText}>
              {liked ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  posterContainer: {
    height: 460,
  },
  poster: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  actionText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  overview: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
