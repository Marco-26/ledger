import { Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ITransaction } from "@ledger/api";
import TransactionRow from "@/components/transactions/transaction-row/TransactionRow";
import Divider from "@/components/ui/divider/Divider";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { HIT_SLOP, Radius } from "@/styles/tokens";
import { createStyles } from "./TopMovements.styles";

interface TopMovementsProps {
  title: string;
  transactions?: ITransaction[];
  isLoading: boolean;
  emptyLabel: string;
  /** Pre-selects the matching filter on the transactions tab. */
  filter: "income" | "expense";
}

const MAX_ITEMS = 3;

/** The three biggest movements of the month, in the shape used everywhere else. */
export default function TopMovements({
  title,
  transactions,
  isLoading,
  emptyLabel,
  filter,
}: TopMovementsProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const router = useRouter();
  const items = (transactions ?? []).slice(0, MAX_ITEMS);

  return (
    <View>
      <SectionHeading
        title={title}
        accessory={
          <TouchableOpacity
            style={styles.seeAll}
            hitSlop={HIT_SLOP}
            activeOpacity={0.6}
            accessibilityRole="link"
            accessibilityLabel={`See all ${title.toLowerCase()}`}
            onPress={() => router.push(`/transactions?type=${filter}`)}
          >
            <Text style={styles.seeAllLabel}>See all</Text>
            <Ionicons
              name="chevron-forward"
              size={13}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        }
      />

      {isLoading ? (
        <>
          {Array.from({ length: MAX_ITEMS }).map((_, index) => (
            <Fragment key={index}>
              {index > 0 ? <Divider /> : null}
              <View style={styles.skeletonRow}>
                <Skeleton width={38} height={38} radius={Radius.full} />
                <View style={styles.skeletonBody}>
                  <Skeleton width="62%" height={14} />
                  <Skeleton width="38%" height={11} />
                </View>
                <Skeleton width={76} height={14} />
              </View>
            </Fragment>
          ))}
        </>
      ) : items.length > 0 ? (
        items.map((transaction, index) => (
          <Fragment key={`${transaction.description}-${index}`}>
            {index > 0 ? <Divider /> : null}
            <TransactionRow transaction={transaction} />
          </Fragment>
        ))
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyLabel}>{emptyLabel}</Text>
        </View>
      )}
    </View>
  );
}
