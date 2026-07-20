import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { BlogCard } from "@/components/BlogCard";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { blogPosts } from "@/data/blog";

export default function BlogScreen() {
  const { colors, spacing, fontFamily, type } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ResponsiveContainer maxWidth={800} style={{ paddingTop: insets.top + 12, paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
        <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.secondary, letterSpacing: 1.5 }}>
          FROM OUR KITCHEN
        </Text>
        <Text style={[type.h1, { color: colors.text, marginTop: 2 }]}>The Bosphorus Journal</Text>
        <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.textMuted, marginTop: 6 }}>
          Stories on Turkish cuisine, our kitchen, and life around Labone.
        </Text>
      </ResponsiveContainer>
      <ScrollView contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ResponsiveContainer maxWidth={800}>
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              layout={index === 0 ? "stack" : "row"}
              onPress={() => router.push({ pathname: "/blog/[slug]", params: { slug: post.slug } })}
            />
          ))}
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}
