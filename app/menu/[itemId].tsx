import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { FormField } from "@/components/ui/FormField";
import { currency, getMenuItemById, getMenuItemsByCategory } from "@/data/menu";

export default function MenuItemDetailScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const item = useMemo(() => getMenuItemById(itemId), [itemId]);
  const { colors, spacing, radii, fontFamily, type } = useTheme();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  if (!item) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Dish not found" />
        <View style={{ padding: spacing.lg }}>
          <Text style={{ fontFamily: fontFamily.body, color: colors.textMuted }}>
            We couldn&rsquo;t find that dish. It may have been removed from the menu.
          </Text>
        </View>
      </View>
    );
  }

  const related = getMenuItemsByCategory(item.categoryId).filter((i) => i.id !== item.id).slice(0, 4);

  const handleAdd = () => {
    addItem(item, quantity, notes.trim() || undefined);
    showToast(`${quantity} × ${item.name} added to your order`);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={200}
            accessibilityLabel={`Photo of ${item.name}`}
          />
          <View style={styles.headerOverlay}>
            <ScreenHeader title="" transparent />
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg }}>
          <View style={styles.tagsRow}>
            {item.tags?.map((tag) => (
              <Badge key={tag} label={tag} tone={tag === "Spicy" ? "secondary" : "accent"} />
            ))}
          </View>
          <Text style={[type.h1, { color: colors.text, marginTop: 10 }]}>{item.name}</Text>
          {item.turkishName ? (
            <Text style={{ fontFamily: fontFamily.displayLight, fontStyle: "italic", fontSize: 18, color: colors.textMuted }}>
              {item.turkishName}
            </Text>
          ) : null}
          <Text style={[type.price, { color: colors.primary, fontSize: 22, marginTop: 10 }]}>
            {currency}
            {item.price}
          </Text>
          <Text style={{ fontFamily: fontFamily.body, fontSize: 15, lineHeight: 23, color: colors.text, marginTop: 14 }}>
            {item.description}
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.text, marginBottom: 10 }}>
            Quantity
          </Text>
          <QuantityStepper quantity={quantity} onIncrement={() => setQuantity((q) => q + 1)} onDecrement={() => setQuantity((q) => Math.max(1, q - 1))} min={1} />

          <View style={{ marginTop: spacing.lg }}>
            <FormField
              label="Special instructions"
              value={notes}
              onChangeText={setNotes}
              placeholder="E.g. no onions, extra spicy…"
              multiline
            />
          </View>

          {related.length > 0 ? (
            <View style={{ marginTop: spacing.md }}>
              <Text style={[type.h3, { color: colors.text, marginBottom: 10 }]}>You might also like</Text>
              {related.map((relatedItem) => (
                <RelatedRow key={relatedItem.id} name={relatedItem.name} price={relatedItem.price} />
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + 12 },
        ]}
      >
        <Button
          label={`Add to order — ${currency}${(item.price * quantity).toFixed(2)}`}
          onPress={handleAdd}
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}

function RelatedRow({ name, price }: { name: string; price: number }) {
  const { colors, fontFamily } = useTheme();
  return (
    <View style={styles.relatedRow}>
      <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.text, flex: 1 }} numberOfLines={1}>
        {name}
      </Text>
      <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.primary }}>
        {currency}
        {price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    width: "100%",
    height: 320,
    backgroundColor: "#00000010",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  relatedRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
});
