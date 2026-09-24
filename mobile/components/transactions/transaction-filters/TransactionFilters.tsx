import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterChip from "@/components/transactions/filter-chip/FilterChip";
import SegmentedControl from "@/components/ui/segmented-control/SegmentedControl";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { HIT_SLOP } from "@/styles/tokens";
import { categoryLabel } from "@/utils/categories";
import { createStyles } from "./TransactionFilters.styles";

export type TypeFilter = "all" | "income" | "expense";

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expenses" },
];

interface TransactionFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (value: TypeFilter) => void;
  /** Only the categories actually present in the current month. */
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (value: string | null) => void;
}

export default function TransactionFilters({
  query,
  onQueryChange,
  typeFilter,
  onTypeFilterChange,
  categories,
  activeCategory,
  onCategoryChange,
}: TransactionFiltersProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.searchField}>
        <Ionicons name="search" size={17} color={colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search movements"
          placeholderTextColor={colors.textTertiary}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="never"
          accessibilityLabel="Search movements"
        />
        {query.length > 0 ? (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onQueryChange("")}
            hitSlop={HIT_SLOP}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Ionicons
              name="close-circle"
              size={17}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <SegmentedControl
        options={TYPE_OPTIONS}
        value={typeFilter}
        onChange={onTypeFilterChange}
        accessibilityLabel="Filter by type"
      />

      {categories.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
          keyboardShouldPersistTaps="handled"
        >
          <FilterChip
            label="All categories"
            isActive={activeCategory === null}
            onPress={() => onCategoryChange(null)}
          />
          {categories.map((category) => (
            <FilterChip
              key={category}
              label={categoryLabel(category)}
              isActive={activeCategory === category}
              onPress={() =>
                onCategoryChange(activeCategory === category ? null : category)
              }
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}
