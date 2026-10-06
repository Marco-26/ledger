import { View } from "react-native";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import VerticalDivider from "@/components/ui/vertical-divider/VerticalDivider";
import { styles } from "./MonthSummarySkeleton.styles";

export default function MonthSummarySkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Skeleton width={92} height={13} />
        <Skeleton width={220} height={40} />
        <Skeleton width={140} height={12} />
      </View>
      <View style={styles.splitRow}>
        <View style={styles.column}>
          <Skeleton width={70} height={12} />
          <Skeleton width={120} height={24} />
        </View>
        <VerticalDivider />
        <View style={styles.column}>
          <Skeleton width={70} height={12} />
          <Skeleton width={120} height={24} />
        </View>
      </View>
    </View>
  );
}
