import React from "react";
import { Dimensions, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PromoCard } from "@/components/PromoCard";
import { BlogCard } from "@/components/BlogCard";
import { CartBar } from "@/components/CartBar";
import { BosphorusLogo } from "@/components/BosphorusLogo";
import { menuItems, currency } from "@/data/menu";
import { promos } from "@/data/promos";
import { blogPosts } from "@/data/blog";
import { restaurant } from "@/data/restaurant";

const { width: screenWidth } = Dimensions.get("window");
const HERO_HEIGHT = Math.min(screenWidth * 1.1, 520);
const featuredItems = menuItems.filter((item) => item.tags?.includes("Chef's Pick")).slice(0, 6);

export default function HomeScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { height: HERO_HEIGHT }]}>
          <Image
            source={{ uri: "https://loremflickr.com/1200/1400/istanbul,bosphorus" }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={300}
            accessibilityLabel="View of the Bosphorus strait at dusk"
          />
          <LinearGradient
            colors={["rgba(11,22,21,0.15)", "rgba(11,22,21,0.85)"]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.heroContent, { paddingTop: insets.top + 12, paddingHorizontal: spacing.lg }]}>
            <View style={styles.heroTop}>
              <BosphorusLogo variant="mark" size={44} color="#FFFFFF" />
              <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: "#F1EEE5", letterSpacing: 2 }}>
                ACCRA · LABONE
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.accent, letterSpacing: 1.5, marginBottom: 8 }}>
                TURKISH RESTAURANT & CAFE
              </Text>
              <Text style={{ fontFamily: fontFamily.displayBold, fontSize: 44, lineHeight: 48, color: "#FFFFFF" }}>
                {restaurant.name}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.body,
                  fontSize: 15,
                  lineHeight: 22,
                  color: "#F1EEE5",
                  marginTop: 12,
                  maxWidth: 340,
                }}
              >
                Charcoal-fired kebabs, mezze, and Turkish coffee — brought to Labone from the shores of the Bosphorus.
              </Text>
              <View style={{ marginTop: 10 }}>
                <RatingStars rating={restaurant.rating} reviewCount={restaurant.reviewCount} size={15} />
              </View>
              <View style={styles.heroActions}>
                <Button label="View Menu" onPress={() => router.push("/(tabs)/menu")} size="lg" />
                <Button
                  label="Order Now"
                  variant="outline"
                  size="lg"
                  onPress={() => router.push("/(tabs)/menu")}
                  style={{ borderColor: "#FFFFFF" }}
                  accessibilityLabel="Order now, browse the menu"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Quick info strip */}
        <View style={[styles.infoStrip, { backgroundColor: colors.primary, marginHorizontal: spacing.lg, borderRadius: radii.lg, marginTop: -32 }]}>
          <InfoStripItem icon="time-outline" label={`Closes ${restaurant.closesAt}`} />
          <View style={[styles.divider, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
          <Pressable
            style={styles.infoStripItem}
            accessibilityRole="link"
            accessibilityLabel="Get directions on Google Maps"
            onPress={() => Linking.openURL(restaurant.mapsQuery)}
          >
            <Ionicons name="navigate-outline" size={18} color="#FFFFFF" />
            <Text style={styles.infoStripText}>Directions</Text>
          </Pressable>
          <View style={[styles.divider, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
          <Pressable
            style={styles.infoStripItem}
            accessibilityRole="link"
            accessibilityLabel={`Call ${restaurant.phoneDisplay}`}
            onPress={() => Linking.openURL(`tel:${restaurant.phoneTel}`)}
          >
            <Ionicons name="call-outline" size={18} color="#FFFFFF" />
            <Text style={styles.infoStripText}>Call</Text>
          </Pressable>
        </View>

        {/* Promos */}
        <View style={{ marginTop: spacing.xl }}>
          <SectionHeading
            eyebrow="Limited time"
            title="Promotions"
            subtitle="Seasonal set menus and standing offers"
            actionLabel="View all"
            onActionPress={() => router.push("/promos")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
          >
            {promos.map((promo) => (
              <PromoCard
                key={promo.id}
                promo={promo}
                onPress={() => router.push({ pathname: "/promos", params: { highlight: promo.id } })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured menu */}
        <View style={{ marginTop: spacing.xl }}>
          <SectionHeading
            eyebrow="Chef's picks"
            title="From the Grill"
            subtitle="Guest favourites, made fresh daily"
            actionLabel="Full menu"
            onActionPress={() => router.push("/(tabs)/menu")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
          >
            {featuredItems.map((item) => (
              <View
                key={item.id}
                style={[styles.featuredCard, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`View details for ${item.name}, ${currency}${item.price}`}
                  onPress={() => router.push({ pathname: "/menu/[itemId]", params: { itemId: item.id } })}
                  style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[styles.featuredImage, { borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg }]}
                    contentFit="cover"
                    transition={200}
                    accessibilityLabel={`Photo of ${item.name}`}
                  />
                  <View style={{ padding: 12, paddingRight: 40 }}>
                    <Text style={[type.h3, { color: colors.text, fontSize: 16 }]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 15, color: colors.primary, marginTop: 8 }}>
                      {currency}
                      {item.price}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Add ${item.name} to cart`}
                  hitSlop={8}
                  onPress={() => {
                    addItem(item);
                    showToast(`${item.name} added to your order`);
                  }}
                  style={[styles.smallAddBtn, { backgroundColor: colors.primary, borderRadius: radii.pill }]}
                >
                  <Ionicons name="add" size={16} color={colors.onPrimary} />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Blog teaser */}
        <View style={{ marginTop: spacing.xl }}>
          <SectionHeading
            eyebrow="From our kitchen"
            title="Stories & Notes"
            actionLabel="Read the blog"
            onActionPress={() => router.push("/(tabs)/blog")}
          />
          {blogPosts.slice(0, 2).map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              onPress={() => router.push({ pathname: "/blog/[slug]", params: { slug: post.slug } })}
            />
          ))}
        </View>
      </ScrollView>
      <CartBar />
    </View>
  );
}

function InfoStripItem({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.infoStripItem}>
      <Ionicons name={icon} size={18} color="#FFFFFF" />
      <Text style={styles.infoStripText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  heroContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 56,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    flexWrap: "wrap",
  },
  infoStrip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  infoStripItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  infoStripText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#FFFFFF",
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
  },
  featuredCard: {
    width: 180,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#00000010",
  },
  smallAddBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
