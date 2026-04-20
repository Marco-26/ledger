import 'package:flutter/material.dart';
import '../models/transaction.dart';
import '../theme/app_theme.dart';
import '../utils/formatters.dart';

class TransactionHistory extends StatefulWidget {
  final List<Transaction> creditList;
  final List<Transaction> debitList;

  const TransactionHistory({
    super.key,
    required this.creditList,
    required this.debitList,
  });

  @override
  State<TransactionHistory> createState() => _TransactionHistoryState();
}

class _TransactionHistoryState extends State<TransactionHistory>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this, initialIndex: 1);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? AppColors.darkCard : AppColors.card;
    final borderColor = isDark ? AppColors.darkBorder : AppColors.border;
    final mutedBg = isDark ? AppColors.darkMuted : AppColors.muted;
    final mutedFg = isDark
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;
    final fgColor = isDark ? AppColors.darkForeground : AppColors.foreground;

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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'HISTORY',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                    letterSpacing: 1.5,
                    color: mutedFg,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'All Transactions',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: fgColor,
                  ),
                ),
              ],
            ),
          ),

          // Tabs + content
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                // Custom tab bar
                Container(
                  height: 34,
                  padding: const EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: mutedBg,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: borderColor.withValues(alpha: 0.6),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _TabButton(
                        label: 'Income',
                        isSelected: _tabController.index == 0,
                        activeColor: AppColors.income,
                        onTap: () => setState(() => _tabController.index = 0),
                        isDark: isDark,
                        borderColor: borderColor,
                        cardBg: cardBg,
                        fgColor: mutedFg,
                      ),
                      const SizedBox(width: 2),
                      _TabButton(
                        label: 'Expenses',
                        isSelected: _tabController.index == 1,
                        activeColor: AppColors.expense,
                        onTap: () => setState(() => _tabController.index = 1),
                        isDark: isDark,
                        borderColor: borderColor,
                        cardBg: cardBg,
                        fgColor: mutedFg,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                // Table
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 200),
                  child: _tabController.index == 0
                      ? TransactionTable(
                          key: const ValueKey('income'),
                          transactions: widget.creditList,
                          isIncome: true,
                          emptyMessage: 'No income transactions found.',
                        )
                      : TransactionTable(
                          key: const ValueKey('expenses'),
                          transactions: widget.debitList,
                          isIncome: false,
                          emptyMessage: 'No expense transactions found.',
                        ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TabButton extends StatelessWidget {
  final String label;
  final bool isSelected;
  final Color activeColor;
  final VoidCallback onTap;
  final bool isDark;
  final Color borderColor;
  final Color cardBg;
  final Color fgColor;

  const _TabButton({
    required this.label,
    required this.isSelected,
    required this.activeColor,
    required this.onTap,
    required this.isDark,
    required this.borderColor,
    required this.cardBg,
    required this.fgColor,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
        decoration: BoxDecoration(
          color: isSelected ? cardBg : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.08),
                    blurRadius: 4,
                    offset: const Offset(0, 1),
                  ),
                ]
              : null,
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            letterSpacing: 0.5,
            color: isSelected ? activeColor : fgColor,
          ),
        ),
      ),
    );
  }
}

class TransactionTable extends StatelessWidget {
  final List<Transaction> transactions;
  final bool isIncome;
  final String emptyMessage;

  const TransactionTable({
    super.key,
    required this.transactions,
    required this.isIncome,
    required this.emptyMessage,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark ? AppColors.darkBorder : AppColors.border;
    final mutedFg = isDark
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;
    final fgColor = isDark ? AppColors.darkForeground : AppColors.foreground;
    final amountColor = isIncome ? AppColors.income : AppColors.expense;
    final amountPrefix = isIncome ? '+' : '-';
    final headerBg = isDark
        ? AppColors.darkMuted.withValues(alpha: 0.8)
        : AppColors.muted.withValues(alpha: 0.8);

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: borderColor),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxHeight: 340),
          child: Column(
            children: [
              // Table header
              Container(
                color: headerBg,
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                child: Row(
                  children: [
                    SizedBox(
                      width: 90,
                      child: Text(
                        'DATE',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 1.2,
                          color: mutedFg,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(
                        'DESCRIPTION',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 1.2,
                          color: mutedFg,
                        ),
                      ),
                    ),
                    SizedBox(
                      width: 100,
                      child: Text(
                        'AMOUNT',
                        textAlign: TextAlign.right,
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 1.2,
                          color: mutedFg,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(height: 1, color: borderColor),
              // Rows
              if (transactions.isEmpty)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 48),
                  child: Center(
                    child: Text(
                      emptyMessage,
                      style: TextStyle(fontSize: 14, color: mutedFg),
                    ),
                  ),
                )
              else
                Flexible(
                  child: ListView.separated(
                    shrinkWrap: true,
                    itemCount: transactions.length,
                    separatorBuilder: (context, _) => Container(
                      height: 1,
                      color: borderColor.withValues(alpha: 0.5),
                    ),
                    itemBuilder: (context, index) {
                      final tx = transactions[index];
                      final amount = isIncome ? tx.credit : tx.debit;
                      return _TableRow(
                        date: formatDate(tx.date),
                        description: tx.description,
                        amount: '$amountPrefix${formatCurrency(amount)}',
                        amountColor: amountColor,
                        fgColor: fgColor,
                        mutedFg: mutedFg,
                        isDark: isDark,
                        borderColor: borderColor,
                      );
                    },
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TableRow extends StatefulWidget {
  final String date;
  final String description;
  final String amount;
  final Color amountColor;
  final Color fgColor;
  final Color mutedFg;
  final bool isDark;
  final Color borderColor;

  const _TableRow({
    required this.date,
    required this.description,
    required this.amount,
    required this.amountColor,
    required this.fgColor,
    required this.mutedFg,
    required this.isDark,
    required this.borderColor,
  });

  @override
  State<_TableRow> createState() => _TableRowState();
}

class _TableRowState extends State<_TableRow> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final hoverBg = widget.isDark
        ? AppColors.darkMuted.withValues(alpha: 0.4)
        : AppColors.muted.withValues(alpha: 0.4);

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 100),
        color: _hovered ? hoverBg : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            SizedBox(
              width: 90,
              child: Text(
                widget.date,
                style: TextStyle(fontSize: 12, color: widget.mutedFg),
              ),
            ),
            Expanded(
              child: Text(
                widget.description,
                style: TextStyle(fontSize: 14, color: widget.fgColor),
              ),
            ),
            SizedBox(
              width: 100,
              child: Text(
                widget.amount,
                textAlign: TextAlign.right,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: widget.amountColor,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
