import { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TransactionType, type ITransaction } from "@ledger/api";
import MonthStepper from "@/components/month-stepper/MonthStepper";
import TransactionFilters, {
  type TypeFilter,
} from "@/components/transactions/transaction-filters/TransactionFilters";
import TransactionRow from "@/components/transactions/transaction-row/TransactionRow";
import Divider from "@/components/ui/divider/Divider";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import StateMessage from "@/components/ui/state-message/StateMessage";
import { useStatement } from "@/context/StatementContext";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Radius } from "@/styles/tokens";
import { categoryLabel } from "@/utils/categories";
import {
  formatCurrency,
  formatDayLabel,
  formatMonthLabel,
} from "@/utils/format";
import { createStyles } from "@/styles/screens/TransactionsScreen.styles";

interface DaySection {
  title: string;
  total: number;
  data: ITransaction[];
}

function matchesQuery(transaction: ITransaction, query: string): boolean {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  return (
    transaction.description?.toLowerCase().includes(needle) ||
    categoryLabel(transaction.category).toLowerCase().includes(needle)
  );
}

export default function TransactionsScreen() {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ type?: string }>();
  const router = useRouter();

  // "Transactions" is one unbreakable word: on 320pt screens it has to give
  // way a little so the month stepper stays fully reachable.
  const isNarrow = width < 360;

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

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [category, setCategory] = useState<string | null>(null);

  // "See all" on the dashboard arrives here with a type already chosen. The
  // param is consumed straight away so tapping the same link again re-applies
  // it after the filter has been changed by hand.
  useEffect(() => {
    if (params.type === "income" || params.type === "expense") {
      setTypeFilter(params.type);
      router.setParams({ type: undefined });
    }
  }, [params.type, router]);

  const transactions = useMemo(
    () => statement?.allTransactions ?? [],
    [statement],
  );

  const categories = useMemo(() => {
    const present = new Set<string>();
    transactions.forEach((transaction) => {
      if (
        transaction.category &&
        (typeFilter === "all" || transaction.type === typeFilter)
      ) {
        present.add(transaction.category);
      }
    });
    return [...present].sort((a, b) =>
      categoryLabel(a).localeCompare(categoryLabel(b)),
    );
  }, [transactions, typeFilter]);

  // A category can stop existing when the type filter changes.
  useEffect(() => {
    if (category && !categories.includes(category)) {
      setCategory(null);
    }
  }, [categories, category]);

  const filtered = useMemo(
    () =>
      transactions.filter(
        (transaction) =>
          (typeFilter === "all" || transaction.type === typeFilter) &&
          (category === null || transaction.category === category) &&
          matchesQuery(transaction, query),
      ),
    [transactions, typeFilter, category, query],
  );

  const sections = useMemo<DaySection[]>(() => {
    const byDay = new Map<string, ITransaction[]>();

    [...filtered]
      .sort((a, b) => b.date.valueOf() - a.date.valueOf())
      .forEach((transaction) => {
        const key = transaction.date.format("YYYY-MM-DD");
        const bucket = byDay.get(key);
        if (bucket) bucket.push(transaction);
        else byDay.set(key, [transaction]);
      });

    return [...byDay.values()].map((items) => ({
      title: formatDayLabel(items[0].date),
      total: items.reduce(
        (sum, item) =>
          item.type === TransactionType.INCOME
            ? sum + Math.abs(item.amount)
            : sum - Math.abs(item.amount),
        0,
      ),
      data: items,
    }));
  }, [filtered]);

  const net = useMemo(
    () =>
      filtered.reduce(
        (sum, item) =>
          item.type === TransactionType.INCOME
            ? sum + Math.abs(item.amount)
            : sum - Math.abs(item.amount),
        0,
      ),
    [filtered],
  );

  const hasFilters =
    query.length > 0 || typeFilter !== "all" || category !== null;

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setCategory(null);
  };

  const renderBody = () => {
    if (isError) {
      return (
        <StateMessage
          icon="cloud-offline-outline"
          tone="error"
          title="We couldn't load this month"
          message="Check your connection and try again."
          actionLabel="Try again"
          onAction={refetch}
        />
      );
    }

    if (isLoading) {
      return (
        <View style={styles.skeletonList}>
          {Array.from({ length: 7 }).map((_, index) => (
            <View key={index} style={styles.skeletonRow}>
              <Skeleton width={38} height={38} radius={Radius.full} />
              <View style={styles.skeletonBody}>
                <Skeleton width="58%" height={14} />
                <Skeleton width="34%" height={11} />
              </View>
              <Skeleton width={72} height={14} />
            </View>
          ))}
        </View>
      );
    }

    if (isEmpty || transactions.length === 0) {
      return (
        <StateMessage
          icon="document-text-outline"
          title={`Nothing in ${formatMonthLabel(selectedDate)}`}
          message="No movements have been recorded for this month yet."
        />
      );
    }

    return (
      <SectionList
        sections={sections}
        keyExtractor={(item, index) =>
          `${item.date.valueOf()}-${item.description}-${index}`
        }
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.listContent}
        initialNumToRender={12}
        windowSize={11}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.textTertiary}
            colors={[colors.textSecondary]}
            progressBackgroundColor={colors.surface}
          />
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {/* A single movement already shows its own amount on the row. */}
            {section.data.length > 1 ? (
              <Text style={styles.sectionTotal}>
                {section.total >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(section.total))}
              </Text>
            ) : null}
          </View>
        )}
        renderItem={({ item, index, section }) => (
          <>
            {index > 0 ? <Divider /> : null}
            <TransactionRow transaction={item} showDate={false} />
            {index === section.data.length - 1 ? (
              <View style={styles.sectionTail} />
            ) : null}
          </>
        )}
        ListEmptyComponent={
          <StateMessage
            icon="search-outline"
            title="No matching movements"
            message="Try a different search or clear the filters."
            actionLabel={hasFilters ? "Clear filters" : undefined}
            onAction={hasFilters ? clearFilters : undefined}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, isNarrow && styles.titleCompact]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            Transactions
          </Text>
          <MonthStepper
            date={selectedDate}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
            canGoNext={canGoToNextMonth}
          />
        </View>

        {isLoading ? (
          // Placeholders keep the header the same height as the loaded state,
          // so nothing jumps when the month arrives.
          <View style={styles.headerSkeleton}>
            <Skeleton width={160} height={12} />
            <Skeleton width="100%" height={44} radius={Radius.md} />
            <Skeleton width="100%" height={40} radius={Radius.full} />
          </View>
        ) : null}

        {!isLoading && !isError && !isEmpty ? (
          <Text style={styles.summaryLine}>
            {filtered.length} {filtered.length === 1 ? "movement" : "movements"}
          </Text>
        ) : null}

        {!isLoading && !isError && !isEmpty && transactions.length > 0 ? (
          <View style={styles.filters}>
            <TransactionFilters
              query={query}
              onQueryChange={setQuery}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              categories={categories}
              activeCategory={category}
              onCategoryChange={setCategory}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.body}>{renderBody()}</View>
    </SafeAreaView>
  );
}
