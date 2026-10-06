import { View } from "react-native";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { Radius } from "@/styles/tokens";
import { styles } from "./TransactionFiltersSkeleton.styles";

export default function TransactionFiltersSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={160} height={12} />
      <Skeleton width="100%" height={44} radius={Radius.md} />
      <Skeleton width="100%" height={40} radius={Radius.full} />
    </View>
  );
}
