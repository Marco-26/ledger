import { Text, View } from "react-native";
import { styles } from "./SectionHeaderStyles";

interface SectionHeaderProps {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
