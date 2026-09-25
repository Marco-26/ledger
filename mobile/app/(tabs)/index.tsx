import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryBreakdown from "@/components/dashboard/category-breakdown/CategoryBreakdown";
import GreetingHeader from "@/components/dashboard/greeting-header/GreetingHeader";
import MonthSummary from "@/components/dashboard/month-summary/MonthSummary";
import TopMovements from "@/components/dashboard/top-movements/TopMovements";
import MonthStepper from "@/components/month-stepper/MonthStepper";
import Divider from "@/components/ui/divider/Divider";
import StateMessage from "@/components/ui/state-message/StateMessage";
import { useStatement } from "@/context/StatementContext";
import { useTheme } from "@/styles/theme";
import { MAX_CONTENT_WIDTH, Spacing } from "@/styles/tokens";
import { Constants } from "@/utils/constants";
import { formatMonthLabel } from "@/utils/format";
import UploadFileFloatingButton from "@/components/ui/floating-button/FloatingButton";

export default function HomeScreen() {
  const { colors } = useTheme();
  const {
    statement,
    isLoading,
    isError,
    isEmpty,
    isRefetching,
    refetch,
    selectedDate,
    goToPreviousMonth,
    goToNextMonth,
    canGoToNextMonth,
  } = useStatement();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.textTertiary}
            colors={[colors.textSecondary]}
            progressBackgroundColor={colors.surface}
          />
        }
      >
        <GreetingHeader name={Constants.USER.NAME} />

        <MonthStepper
          date={selectedDate}
          onPrevious={goToPreviousMonth}
          onNext={goToNextMonth}
          canGoNext={canGoToNextMonth}
          fullWidth
          style={styles.monthStepper}
        />

        {isError ? (
          <StateMessage
            icon="cloud-offline-outline"
            tone="error"
            title="We couldn't load this month"
            message="Check your connection and try again."
            actionLabel="Try again"
            onAction={refetch}
          />
        ) : isEmpty ? (
          <StateMessage
            icon="document-text-outline"
            title={`Nothing in ${formatMonthLabel(selectedDate)}`}
            message="No statement has been imported for this month yet."
          />
        ) : (
          <>
            <MonthSummary statement={statement} isLoading={isLoading} />

            <Divider style={styles.rule} />

            <TopMovements
              title="Top income"
              transactions={statement?.topIncomes}
              isLoading={isLoading}
              emptyLabel="No income recorded this month."
              filter="income"
            />

            <Divider style={styles.rule} />

            <TopMovements
              title="Top spending"
              transactions={statement?.topExpenses}
              isLoading={isLoading}
              emptyLabel="No spending recorded this month."
              filter="expense"
            />

            <Divider style={styles.rule} />

            <CategoryBreakdown
              categories={statement?.transactionCategories}
              isLoading={isLoading}
            />
          </>
        )}

        <View style={styles.tail} />
			</ScrollView>
      <UploadFileFloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    width: "100%",
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: "center",
    paddingHorizontal: Spacing[5],
  },
  rule: {
    marginVertical: Spacing[7],
  },
  tail: {
    height: Spacing[8],
  },
  monthStepper: {
    marginBottom: Spacing[7],
    width: "100%",
  },
});
