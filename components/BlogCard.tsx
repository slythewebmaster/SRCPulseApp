import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useTheme";
import type { BlogPost } from "@/data/blog";

type BlogCardProps = {
  post: BlogPost;
  onPress: () => void;
  layout?: "row" | "stack";
};

export function BlogCard({ post, onPress, layout = "row" }: BlogCardProps) {
  const { colors, radii, spacing, shadow, fontFamily } = useTheme();
  const isRow = layout === "row";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Read article: ${post.title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        shadow.card,
        isRow ? styles.row : styles.stack,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          marginHorizontal: spacing.lg,
          marginBottom: spacing.md,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <Image
        source={{ uri: post.image }}
        style={isRow ? [styles.rowImage, { borderRadius: radii.md }] : [styles.stackImage, { borderRadius: radii.md }]}
        contentFit="cover"
        transition={200}
        accessibilityLabel={`Cover image for ${post.title}`}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 11, color: colors.secondary, letterSpacing: 0.5 }}>
          {post.category.toUpperCase()} · {post.readTime}
        </Text>
        <Text
          style={{ fontFamily: fontFamily.displaySemiBold, fontSize: 18, color: colors.text, marginTop: 4 }}
          numberOfLines={2}
        >
          {post.title}
        </Text>
        <Text
          style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, marginTop: 4, lineHeight: 18 }}
          numberOfLines={2}
        >
          {post.excerpt}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  stack: {
    flexDirection: "column",
    gap: 10,
  },
  rowImage: {
    width: 96,
    height: 96,
    backgroundColor: "#00000010",
  },
  stackImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#00000010",
  },
});
