import { Text, View } from "react-native";
import { styles } from "./CategoryChip.styles";

interface CategoryChipProps {
  category?: string | null;
}

export default function CategoryChip({ category }: CategoryChipProps) {
  if (!category) {
    return null;
  }

  return (
    <View style={styles.chip}>
      <Text style={styles.text} numberOfLines={1}>
        {category}
      </Text>
    </View>
  );
}
