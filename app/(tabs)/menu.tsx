import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useResponsive } from "@/hooks/useResponsive";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CartBar } from "@/components/CartBar";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { menuCategories, menuItems, type MenuCategoryId, type MenuItem } from "@/data/menu";

type FilterId = MenuCategoryId | "all";

export default function MenuScreen() {
  const { colors, spacing, radii, fontFamily, type } = useTheme();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { columns, isTablet } = useResponsive();
  const [filter, setFilter] = useState<FilterId>("all");

  const sections = useMemo(() => {
    const categories = filter === "all" ? menuCategories : menuCategories.filter((c) => c.id === filter);
    return categories
      .map((category) => ({
        title: category.label,
        description: category.description,
        data: menuItems.filter((item) => item.categoryId === category.id),
      }))
      .filter((section) => section.data.length > 0);
  }, [filter]);

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    showToast(`${item.name} added to your order`);
  };

  const handleOpen = (item: MenuItem) =>
    router.push({ pathname: "/menu/[itemId]", params: { itemId: item.id } });

  const filterOptions: Array<{ id: FilterId; label: string }> = [
    { id: "all", label: "All" },
    ...menuCategories.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ResponsiveContainer maxWidth={1100} style={{ paddingTop: insets.top + 12, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.secondary, letterSpacing: 1.5 }}>
          À LA CARTE
        </Text>
        <Text style={[type.h1, { color: colors.text, marginTop: 2 }]}>Our Menu</Text>
      </ResponsiveContainer>

      <View style={{ paddingBottom: spacing.sm }}>
        <ResponsiveContainer maxWidth={1100}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          >
            {filterOptions.map((option) => {
              const active = filter === option.id;
              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Filter by ${option.label}`}
                  accessibilityState={{ selected: active }}
                  onPress={() => setFilter(option.id)}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: active ? colors.primary : colors.surfaceAlt,
                      borderRadius: radii.pill,
                      marginRight: 8,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.bodySemiBold,
                      fontSize: 13,
                      color: active ? colors.onPrimary : colors.text,
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </ResponsiveContainer>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <ResponsiveContainer maxWidth={1100}>
          {sections.length === 0 ? (
            <View style={{ padding: spacing.xl, alignItems: "center" }}>
              <Ionicons name="restaurant-outline" size={28} color={colors.textMuted} />
              <Text style={{ fontFamily: fontFamily.body, color: colors.textMuted, marginTop: 8 }}>
                No dishes in this category yet.
              </Text>
            </View>
          ) : (
            sections.map((section) => (
              <View key={section.title}>
                <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.sm }}>
                  <Text style={[type.h3, { color: colors.text }]}>{section.title}</Text>
                  <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
                    {section.description}
                  </Text>
                </View>
                {isTablet ? (
                  <View style={[styles.grid, { paddingHorizontal: spacing.lg }]}>
                    {section.data.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        layout="grid"
                        style={{ flexBasis: `${100 / columns}%`, maxWidth: `${100 / columns}%`, paddingHorizontal: 8 }}
                        onPress={() => handleOpen(item)}
                        onAdd={() => handleAdd(item)}
                      />
                    ))}
                  </View>
                ) : (
                  section.data.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onPress={() => handleOpen(item)}
                      onAdd={() => handleAdd(item)}
                    />
                  ))
                )}
              </View>
            ))
          )}
        </ResponsiveContainer>
      </ScrollView>
      <CartBar />
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
});
