import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const post = useMemo(() => getBlogPostBySlug(slug), [slug]);
  const { colors, spacing, fontFamily, type } = useTheme();
  const router = useRouter();

  if (!post) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Article not found" />
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontFamily: fontFamily.body, color: colors.textMuted }}>
            We couldn&rsquo;t find that article.
          </Text>
        </View>
      </View>
    );
  }

  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: post.image }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={200}
            accessibilityLabel={`Cover image for ${post.title}`}
          />
          <View style={styles.headerOverlay}>
            <ScreenHeader title="" transparent />
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg }}>
          <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.secondary, letterSpacing: 1.5 }}>
            {post.category.toUpperCase()}
          </Text>
          <Text style={[type.h1, { color: colors.text, marginTop: 6 }]}>{post.title}</Text>
          <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.textMuted, marginTop: 10 }}>
            {post.author} · {formattedDate} · {post.readTime}
          </Text>

          <View style={{ marginTop: spacing.lg }}>
            {post.content.map((paragraph, index) => (
              <Text
                key={index}
                style={{
                  fontFamily: fontFamily.body,
                  fontSize: 16,
                  lineHeight: 26,
                  color: colors.text,
                  marginBottom: 16,
                }}
              >
                {paragraph}
              </Text>
            ))}
          </View>

          {morePosts.length > 0 ? (
            <View style={{ marginTop: spacing.lg }}>
              <Text style={[type.h3, { color: colors.text, marginBottom: 10 }]}>More stories</Text>
            </View>
          ) : null}
        </View>

        {morePosts.map((p) => (
          <BlogCard
            key={p.slug}
            post={p}
            onPress={() => router.push({ pathname: "/blog/[slug]", params: { slug: p.slug } })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    width: "100%",
    height: 280,
    backgroundColor: "#00000010",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
