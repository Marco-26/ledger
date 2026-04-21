import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../utils/formatters.dart';

enum SummaryVariant { income, expense, neutral }

class SummaryCardsSection extends StatelessWidget {
  final double creditTotal;
  final double debitTotal;
  final double netBalance;

  const SummaryCardsSection({
    super.key,
    required this.creditTotal,
    required this.debitTotal,
    required this.netBalance,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: SummaryCard(
                title: 'Money In',
                value: creditTotal,
                description: 'Total credit transactions',
                icon: Icons.arrow_upward,
                variant: SummaryVariant.income,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: SummaryCard(
                title: 'Money Out',
                value: debitTotal,
                description: 'Total debit transactions',
                icon: Icons.arrow_downward,
                variant: SummaryVariant.expense,
              ),
            ),
          ],
        ),

        const SizedBox(height: 12),
        SummaryCard(
          title: 'Net Balance',
          value: netBalance,
          description: 'Income minus expenses',
          icon: Icons.balance,
          variant: SummaryVariant.neutral,
        ),
      ],
    );
  }
}

class SummaryCard extends StatelessWidget {
  final String title;
  final double value;
  final String description;
  final IconData icon;
  final SummaryVariant variant;

  const SummaryCard({
    super.key,
    required this.title,
    required this.value,
    required this.description,
    required this.icon,
    required this.variant,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final Color accentColor;
    final Color iconBg;
    final Color iconColor;
    final Color valueColor;
    final Color borderColor;

    switch (variant) {
      case SummaryVariant.income:
        accentColor = AppColors.income;
        iconBg = isDark ? AppColors.darkIncomeMuted : AppColors.incomeMuted;
        iconColor = AppColors.income;
        valueColor = AppColors.income;
        borderColor = AppColors.income.withValues(alpha: 0.2);
      case SummaryVariant.expense:
        accentColor = AppColors.expense;
        iconBg = isDark ? AppColors.darkExpenseMuted : AppColors.expenseMuted;
        iconColor = AppColors.expense;
        valueColor = AppColors.expense;
        borderColor = AppColors.expense.withValues(alpha: 0.2);
      case SummaryVariant.neutral:
        accentColor = isDark
            ? AppColors.darkForeground.withValues(alpha: 0.2)
            : AppColors.foreground.withValues(alpha: 0.2);
        iconBg = isDark ? AppColors.darkMuted : AppColors.muted;
        iconColor = isDark ? AppColors.darkForeground : AppColors.foreground;
        valueColor = value >= 0 ? AppColors.income : AppColors.expense;
        borderColor = isDark ? AppColors.darkBorder : AppColors.border;
    }

    final cardBg = isDark ? AppColors.darkCard : AppColors.card;
    final mutedFg = isDark
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;

    return Container(
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top accent bar
            Container(height: 2, color: accentColor),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Content
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title.toUpperCase(),
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w500,
                            letterSpacing: 1.5,
                            color: mutedFg,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          formatCurrency(value),
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w500,
                            letterSpacing: -0.5,
                            height: 1.0,
                            color: valueColor,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          description,
                          style: TextStyle(fontSize: 12, color: mutedFg),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  // Icon
                  Container(
                    width: 26,
                    height: 26,
                    decoration: BoxDecoration(
                      color: iconBg,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(icon, size: 13, color: iconColor),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
