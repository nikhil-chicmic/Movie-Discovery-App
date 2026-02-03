import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type MovieCardProps = {
  title: string;
  rating: string;
  image: string;
  liked: boolean;
  onLikePress: () => void;
  onPress: () => void;
};

export default function MovieCard({
  title,
  rating,
  image,
  liked,
  onLikePress,
  onPress,
}: MovieCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.poster} />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.ratingRow}>
          <Image
            source={require("../assets/images/imdb-logo.png")}
            style={styles.imdb}
          />
          <Text style={styles.ratingText}>{rating} / 10</Text>
        </View>
      </View>

      <Pressable
        hitSlop={8}
        onPress={(e) => {
          e.stopPropagation();
          onLikePress();
        }}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={22}
          color={liked ? "#ef4444" : "#d1d5db"}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 2,
    borderColor: "#f1f5f9",
  },
  poster: {
    width: 60,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  imdb: {
    width: 28,
    height: 18,
    resizeMode: "contain",
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    color: "#374151",
  },
});
