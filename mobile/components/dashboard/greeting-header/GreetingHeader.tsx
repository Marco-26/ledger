import { Text, View } from "react-native";
import { useThemedStyles } from "@/styles/theme";
import { getGreeting } from "@/utils/format";
import { createStyles } from "./GreetingHeader.styles";

interface GreetingHeaderProps {
  name: string;
}

export default function GreetingHeader({ name }: GreetingHeaderProps) {
  const styles = useThemedStyles(createStyles);
  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.salutation}>{greeting},</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>

      {/* Brand mark, not a control. */}
      <View
        style={styles.monogram}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Text style={styles.monogramText}>{name.charAt(0).toUpperCase()}</Text>
      </View>
    </View>
  );
}
