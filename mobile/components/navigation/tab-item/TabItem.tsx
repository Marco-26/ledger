import { useEffect, useRef } from "react";
import { Animated, Easing, Text, TouchableOpacity } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Duration } from "@/styles/tokens";
import { createStyles } from "./TabItem.styles";

type TabBarIcon =
  BottomTabBarProps["descriptors"][string]["options"]["tabBarIcon"];

interface TabItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  renderIcon: TabBarIcon;
}

/** A single destination: icon, label, and a brass dot that marks the active one. */
export default function TabItem({
  label,
  isFocused,
  onPress,
  onLongPress,
  renderIcon,
}: TabItemProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const progress = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isFocused ? 1 : 0,
      duration: Duration.base,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isFocused, progress]);

  const color = isFocused ? colors.textPrimary : colors.textTertiary;

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
    >
      {renderIcon?.({ focused: isFocused, color, size: 22 })}

      <Text style={[styles.label, { color }]} numberOfLines={1}>
        {label}
      </Text>

      <Animated.View
        style={[
          styles.dot,
          {
            opacity: progress,
            transform: [
              {
                scale: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4, 1],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
}
