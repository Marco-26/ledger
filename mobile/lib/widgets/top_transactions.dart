import 'package:flutter/material.dart';
import '../models/transaction.dart';
import '../theme/app_theme.dart';
import '../utils/formatters.dart';

class TopTransactionsSection extends StatelessWidget {
  final List<Transaction> topIncomes;
  final List<Transaction> topExpenses;

  const TopTransactionsSection({
    super.key,
    required this.topIncomes,
    required this.topExpenses,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TopTransactionsCard(
          transactions: topIncomes,
          title: 'Top Earnings',
          description: 'Highest income sources this period',
          iconData: Icons.trending_up,
          variant: TransactionVariant.income,
        ),
        const SizedBox(height: 12),
        TopTransactionsCard(
          transactions: topExpenses,
          title: 'Top Spending',
          description: 'Highest expense categories this period',
          iconData: Icons.trending_down,
          variant: TransactionVariant.expense,
        ),
      ],
    );
  }
}

enum TransactionVariant { income, expense }

class TopTransactionsCard extends StatelessWidget {
  final List<Transaction> transactions;
  final String title;
  final String description;
  final IconData iconData;
  final TransactionVariant variant;

  const TopTransactionsCard({
    super.key,
    required this.transactions,
    required this.title,
    required this.description,
    required this.iconData,
    required this.variant,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? AppColors.darkCard : AppColors.card;
    final borderColor = isDark ? AppColors.darkBorder : AppColors.border;
    final mutedFg = isDark
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;
    final fgColor = isDark ? AppColors.darkForeground : AppColors.foreground;

    final isIncome = variant == TransactionVariant.income;
    final accentColor = isIncome ? AppColors.income : AppColors.expense;
    final iconBg = isIncome
        ? (isDark ? AppColors.darkIncomeMuted : AppColors.incomeMuted)
        : (isDark ? AppColors.darkExpenseMuted : AppColors.expenseMuted);

    return Container(
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: borderColor)),
            ),
            child: Row(
              children: [
                Container(
                  width: 28,
                  height: 28,
                  decoration: BoxDecoration(
                    color: iconBg,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Icon(iconData, size: 14, color: accentColor),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: fgColor,
                        height: 1.0,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      description,
                      style: TextStyle(fontSize: 12, color: mutedFg),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Transaction rows
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            child: Column(
              children: List.generate(transactions.length, (index) {
                final item = transactions[index];
                return _TransactionRow(
                  rank: index + 1,
                  transaction: item,
                  variant: variant,
                  isDark: isDark,
                  mutedFg: mutedFg,
                  fgColor: fgColor,
                  accentColor: accentColor,
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}

class _TransactionRow extends StatefulWidget {
  final int rank;
  final Transaction transaction;
  final TransactionVariant variant;
  final bool isDark;
  final Color mutedFg;
  final Color fgColor;
  final Color accentColor;

  const _TransactionRow({
    required this.rank,
    required this.transaction,
    required this.variant,
    required this.isDark,
    required this.mutedFg,
    required this.fgColor,
    required this.accentColor,
  });

  @override
  State<_TransactionRow> createState() => _TransactionRowState();
}

class _TransactionRowState extends State<_TransactionRow> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final isIncome = widget.variant == TransactionVariant.income;
    final hoverBg = isIncome
        ? (widget.isDark ? AppColors.darkIncomeMuted : AppColors.incomeMuted)
        : (widget.isDark ? AppColors.darkExpenseMuted : AppColors.expenseMuted);
    final amount = isIncome
        ? widget.transaction.credit
        : widget.transaction.debit;

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: _hovered ? hoverBg : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            // Rank
            SizedBox(
              width: 16,
              child: Text(
                '${widget.rank}',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: widget.accentColor,
                ),
              ),
            ),
            const SizedBox(width: 12),
            // Description + date
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.transaction.description,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: widget.fgColor,
                      height: 1.0,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 3),
                  Text(
                    formatDate(widget.transaction.date),
                    style: TextStyle(fontSize: 11, color: widget.mutedFg),
                  ),
                ],
              ),
            ),
            // Amount
            Text(
              '${isIncome ? '+' : '-'}${formatCurrency(amount)}',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: widget.accentColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
