import { View } from "react-native";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { Radius } from "@/styles/tokens";
import { styles } from "./TransactionRowSkeleton.styles";

export default function TransactionRowSkeleton() {
  return (
    <View style={styles.row}>
      <Skeleton width={38} height={38} radius={Radius.full} />
      <View style={styles.body}>
        <Skeleton width="58%" height={14} />
        <Skeleton width="34%" height={11} />
      </View>
      <Skeleton width={72} height={14} />
    </View>
  );
}
