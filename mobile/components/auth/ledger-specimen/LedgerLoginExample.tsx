import { Fragment } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import dayjs from "dayjs";
import { TransactionType, type ITransaction } from "@ledger/api";
import TransactionRow from "@/components/transactions/transaction-row/TransactionRow";
import { useThemedStyles } from "@/styles/theme";
import { Duration } from "@/styles/tokens";
import { formatMonthLabel } from "@/utils/format";
import { createStyles } from "./LedgerLoginExample.styles";

const today = dayjs();
const SAMPLE_TRANSACTIONS: ITransaction[] = [
  { date: today.subtract(1, "day"), description: "Salary — Acme Lda", category: "salary", amount: 2140, type: TransactionType.INCOME },
  { date: today.subtract(2, "day"), description: "Continente Colombo", category: "groceries", amount: 48.2, type: TransactionType.EXPENSE },
  { date: today.subtract(4, "day"), description: "EDP Comercial", category: "utilities", amount: 61.35, type: TransactionType.EXPENSE },
  { date: today.subtract(5, "day"), description: "Uber *Trip", category: "transportation", amount: 12.9, type: TransactionType.EXPENSE },
];

// Rows fade further down the sheet, as if the page continues out of view.
const ROW_OPACITY = [1, 0.72, 0.42, 0.18];
const STAGGER_MS = 90;

export default function LedgerSpecimen() {
  const styles = useThemedStyles(createStyles);

  return (
    <View
      style={styles.sheet}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.View entering={FadeIn.duration(Duration.slow)} style={styles.sheetHeader}>
        <Text style={styles.sheetLabel}>{formatMonthLabel(today)}</Text>
      </Animated.View>

      {SAMPLE_TRANSACTIONS.map((transaction, index) => (
        <Fragment key={transaction.description}>
          <View style={styles.rule} />
          {/* Fade lives on a wrapper: the entering animation owns the inner opacity. */}
          <View style={{ opacity: ROW_OPACITY[index] }}>
            <Animated.View
              entering={FadeInDown.delay(Duration.base + index * STAGGER_MS).duration(Duration.slow)}
            >
              <TransactionRow transaction={transaction} />
            </Animated.View>
          </View>
        </Fragment>
      ))}
    </View>
  );
}
