import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabItem from "@/components/navigation/tab-item/TabItem";
import { useThemedStyles } from "@/styles/theme";
import { Spacing } from "@/styles/tokens";
import { createStyles } from "./TabBar.styles";

/** Keeps the bar clear of the home indicator without floating it off the edge. */
const MIN_BOTTOM_INSET = Spacing[2];

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, MIN_BOTTOM_INSET) },
      ]}
      accessibilityRole="tablist"
    >
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (isFocused || event.defaultPrevented) return;

            if (Platform.OS !== "web") {
              Haptics.selectionAsync().catch(() => {});
            }
            navigation.navigate(route.name, route.params);
          };

          return (
            <TabItem
              key={route.key}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={() =>
                navigation.emit({ type: "tabLongPress", target: route.key })
              }
              renderIcon={options.tabBarIcon}
            />
          );
        })}
      </View>
    </View>
  );
}
