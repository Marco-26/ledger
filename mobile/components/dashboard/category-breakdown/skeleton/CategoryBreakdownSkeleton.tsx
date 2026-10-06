import { View } from "react-native";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { BAR_HEIGHT } from "../CategoryBreakdown.styles";
import { styles } from "./CategoryBreakdownSkeleton.styles";

const ROWS = 4;

export default function CategoryBreakdownSkeleton() {
  return (
    <View style={styles.list}>
      {Array.from({ length: ROWS }).map((_, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.rowHead}>
            <Skeleton width="40%" height={13} />
            <Skeleton width={64} height={11} />
          </View>
          <Skeleton width="100%" height={BAR_HEIGHT} />
        </View>
      ))}
    </View>
  );
}
