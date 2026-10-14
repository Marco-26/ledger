import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryBreakdown from "@/components/dashboard/category-breakdown/CategoryBreakdown";
import GreetingHeader from "@/components/dashboard/greeting-header/GreetingHeader";
import StatementSummary from "@/components/dashboard/statement-summary/StatementSummary";
import TopMovements from "@/components/dashboard/top-movements/TopMovements";
import PeriodSwitcher from "@/components/dashboard/period-switcher/PeriodSwitcher";
import YearlyNetChart from "@/components/dashboard/yearly-net-chart/YearlyNetChart";
import Divider from "@/components/ui/divider/Divider";
import StateMessage from "@/components/ui/state-message/StateMessage";
import { SelectedPeriod, useStatement } from "@/context/StatementContext";
import { useTheme } from "@/styles/theme";
import { MAX_CONTENT_WIDTH, Spacing } from "@/styles/tokens";
import { Constants } from "@/utils/constants";
import { useCreateStatementQuery } from "@ledger/api";
import UploadFileFloatingButton from "@/components/ui/upload-file-floating-button/UploadFileFloatingButton";
import { formatMonthLabel } from "@/utils/format";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const PERIOD_NOUN_MAPPER: Record<SelectedPeriod, string> = {
  [SelectedPeriod.MONTH]: "month",
  [SelectedPeriod.YEAR]: "year"
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const {
    period,
    isYear,
    setPeriod,
    statement,
    isLoading,
    isError,
    isEmpty,
    isRefetching,
    refetch,
    selectedDate,
    setSelectedDate,
    setUploadingFileMonth,
    uploadingFileMonth,
	} = useStatement();

	const user = useCurrentUser();
	
  const {
    mutate: uploadStatement,
    isPending: isUploading,
  } = useCreateStatementQuery();

  const selectedMonth = selectedDate.date(1).format(Constants.UI.DATE_FORMAT);

  const handleFilePicker = (file: File) => {
    setUploadingFileMonth(selectedMonth);
    uploadStatement(
      { statementFile: file, date: selectedMonth },
      { onSettled: () => setUploadingFileMonth(undefined) },
    );
  };

  const isSelectedMonthUploading =
    !isYear && uploadingFileMonth === selectedMonth;
  
  const isDashboardLoading = isLoading || isSelectedMonthUploading;
  
  const periodLabel = isYear
    ? selectedDate.format("YYYY")
    : formatMonthLabel(selectedDate);
  
  const openMonth = (month: number) => {
    setSelectedDate(selectedDate.month(month).date(1));
    setPeriod(SelectedPeriod.MONTH);
  };

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
				<GreetingHeader user={user} />

        <PeriodSwitcher style={styles.periodSwitcher} />

        {!isSelectedMonthUploading && isError ? (
          <StateMessage
            icon="cloud-offline-outline"
            tone="error"
            title={`We couldn't load this ${PERIOD_NOUN_MAPPER[period]}`}
            message="Check your connection and try again."
            actionLabel="Try again"
            onAction={refetch}
          />
        ) : !isSelectedMonthUploading && isEmpty ? (
          <StateMessage
            icon="document-text-outline"
            title={`Nothing in ${periodLabel}`}
            message={
              isYear
                ? "No statement has been imported for this year yet."
                : "No statement has been imported for this month yet."
            }
          />
        ) : (
          <>
            <StatementSummary
              statement={statement}
              period={period}
              isLoading={isDashboardLoading}
            />

            {isYear && !isDashboardLoading ? (
              <>
                <Divider style={styles.rule} />
                <YearlyNetChart
                  key={selectedDate.year()}
                  year={selectedDate.year()}
                  transactions={statement?.allTransactions}
                  onOpenMonth={openMonth}
                />
              </>
            ) : null}

            <Divider style={styles.rule} />

            <TopMovements
              title={isYear ? `Top income of ${periodLabel}` : "Top income"}
              transactions={statement?.topIncomes}
              isLoading={isDashboardLoading}
              emptyLabel={`No income recorded this ${PERIOD_NOUN_MAPPER[period]}.`}
              filter="income"
              showSeeAll={!isYear}
            />

            <Divider style={styles.rule} />

            <TopMovements
              title={isYear ? `Top spending of ${periodLabel}` : "Top spending"}
              transactions={statement?.topExpenses}
              isLoading={isDashboardLoading}
              emptyLabel={`No spending recorded this ${PERIOD_NOUN_MAPPER[period]
                }.`}
              filter="expense"
              showSeeAll={!isYear}
            />

            <Divider style={styles.rule} />

            <CategoryBreakdown
              categories={statement?.transactionCategories}
              emptyLabel={`No spending recorded this ${PERIOD_NOUN_MAPPER[period]}.`}
              isLoading={isDashboardLoading}
            />
          </>
        )}

        <View style={styles.tail} />
      </ScrollView>
      {!isYear ? (
        <UploadFileFloatingButton
          onFileSelected={handleFilePicker}
          isLoading={isUploading}
          disabled={!!uploadingFileMonth}
        />
      ) : null}
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
  periodSwitcher: {
    marginBottom: Spacing[7],
  },
});
