import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../models/transaction.dart';
import '../theme/app_theme.dart';
import '../utils/formatters.dart';

class CashFlowChart extends StatelessWidget {
  final List<DailyFlow> dailyFlows;

  const CashFlowChart({super.key, required this.dailyFlows});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? AppColors.darkCard : AppColors.card;
    final borderColor = isDark ? AppColors.darkBorder : AppColors.border;
    final mutedFg = isDark
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;

    return Container(
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: borderColor)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'ANALYSIS',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w500,
                        letterSpacing: 1.5,
                        color: mutedFg,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Cash Flow',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: isDark
                            ? AppColors.darkForeground
                            : AppColors.foreground,
                      ),
                    ),
                  ],
                ),
                Text(
                  'Daily income vs. expenses',
                  style: TextStyle(fontSize: 12, color: mutedFg),
                ),
              ],
            ),
          ),

          // Chart
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                SizedBox(height: 220, child: _buildBarChart(isDark, mutedFg)),
                const SizedBox(height: 12),
                // Legend
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _LegendDot(color: AppColors.income, label: 'Income'),
                    const SizedBox(width: 20),
                    _LegendDot(color: AppColors.expense, label: 'Expenses'),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBarChart(bool isDark, Color mutedFg) {
    final gridColor = isDark ? AppColors.darkBorder : AppColors.border;

    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceAround,
        maxY: _maxValue * 1.2,
        barTouchData: BarTouchData(
          touchTooltipData: BarTouchTooltipData(
            getTooltipColor: (_) =>
                isDark ? AppColors.darkMuted : AppColors.muted,
            getTooltipItem: (group, groupIndex, rod, rodIndex) {
              final flow = dailyFlows[group.x.toInt()];
              final isIncome = rodIndex == 0;
              return BarTooltipItem(
                '${formatShortDate(flow.date)}\n',
                TextStyle(
                  color: mutedFg,
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                ),
                children: [
                  TextSpan(
                    text: formatCurrency(isIncome ? rod.toY : rod.toY),
                    style: TextStyle(
                      color: isIncome ? AppColors.income : AppColors.expense,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              );
            },
          ),
        ),
        titlesData: FlTitlesData(
          show: true,
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 28,
              getTitlesWidget: (value, meta) {
                final index = value.toInt();
                if (index < 0 || index >= dailyFlows.length) {
                  return const SizedBox.shrink();
                }
                // Only show every other label to avoid crowding
                if (index % 2 != 0) return const SizedBox.shrink();
                return Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Text(
                    formatShortDate(dailyFlows[index].date),
                    style: TextStyle(fontSize: 10, color: mutedFg),
                  ),
                );
              },
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 48,
              getTitlesWidget: (value, meta) {
                if (value == 0) return const SizedBox.shrink();
                return Text(
                  '€${(value / 1000).toStringAsFixed(0)}k',
                  style: TextStyle(fontSize: 10, color: mutedFg),
                );
              },
            ),
          ),
          rightTitles: const AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          topTitles: const AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
        ),
        gridData: FlGridData(
          show: true,
          drawVerticalLine: false,
          getDrawingHorizontalLine: (_) =>
              FlLine(color: gridColor, strokeWidth: 1, dashArray: null),
        ),
        borderData: FlBorderData(show: false),
        barGroups: List.generate(dailyFlows.length, (i) {
          final flow = dailyFlows[i];
          return BarChartGroupData(
            x: i,
            groupVertically: false,
            barRods: [
              BarChartRodData(
                toY: flow.credit,
                color: AppColors.income,
                width: 8,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(3),
                  topRight: Radius.circular(3),
                ),
              ),
              BarChartRodData(
                toY: flow.debit,
                color: AppColors.expense,
                width: 8,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(3),
                  topRight: Radius.circular(3),
                ),
              ),
            ],
          );
        }),
      ),
    );
  }

  double get _maxValue {
    double max = 0;
    for (final flow in dailyFlows) {
      if (flow.credit > max) max = flow.credit;
      if (flow.debit > max) max = flow.debit;
    }
    return max;
  }
}

class _LegendDot extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendDot({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final mutedFg = isDark
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;

    return Row(
      children: [
        Container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        const SizedBox(width: 6),
        Text(label, style: TextStyle(fontSize: 12, color: mutedFg)),
      ],
    );
  }
}
