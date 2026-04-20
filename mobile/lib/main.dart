import 'package:flutter/material.dart';
import 'data/mock_data.dart';
import 'theme/app_theme.dart';
import 'widgets/dashboard_header.dart';
import 'widgets/summary_cards.dart';
import 'widgets/cash_flow_chart.dart';
import 'widgets/top_transactions.dart';
import 'widgets/transaction_history.dart';

void main() {
  runApp(const LedgerApp());
}

class LedgerApp extends StatefulWidget {
  const LedgerApp({super.key});

  @override
  State<LedgerApp> createState() => _LedgerAppState();
}

class _LedgerAppState extends State<LedgerApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light
          ? ThemeMode.dark
          : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ledger',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: _themeMode,
      home: DashboardPage(
        onThemeToggle: _toggleTheme,
        isDark: _themeMode == ThemeMode.dark,
      ),
    );
  }
}

class DashboardPage extends StatefulWidget {
  final VoidCallback onThemeToggle;
  final bool isDark;

  const DashboardPage({
    super.key,
    required this.onThemeToggle,
    required this.isDark,
  });

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  late DateTime _selectedMonth;

  @override
  void initState() {
    super.initState();
    _selectedMonth = mockStatement.date;
  }

  void _previousMonth() {
    setState(() {
      _selectedMonth = DateTime(_selectedMonth.year, _selectedMonth.month - 1);
    });
  }

  void _nextMonth() {
    setState(() {
      _selectedMonth = DateTime(_selectedMonth.year, _selectedMonth.month + 1);
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bgColor = isDark ? AppColors.darkBackground : AppColors.background;

    return Scaffold(
      backgroundColor: bgColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header
              DashboardHeader(
                selectedMonth: _selectedMonth,
                onPreviousMonth: _previousMonth,
                onNextMonth: _nextMonth,
                onThemeToggle: widget.onThemeToggle,
                isDark: widget.isDark,
              ),

              const SizedBox(height: 28),

              // Top accent line (mimics the gradient line at the top)
              Container(
                height: 2,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.transparent,
                      AppColors.income.withValues(alpha: 0.6),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 28),

              // Summary cards
              SummaryCardsSection(
                creditTotal: mockStatement.creditTotal,
                debitTotal: mockStatement.debitTotal,
                netBalance: mockStatement.netBalance,
              ),

              const SizedBox(height: 20),

              // Cash flow chart
              CashFlowChart(dailyFlows: mockStatement.dailyFlows),

              const SizedBox(height: 20),

              // Top transactions
              TopTransactionsSection(
                topIncomes: mockStatement.topIncomes,
                topExpenses: mockStatement.topExpenses,
              ),

              const SizedBox(height: 20),

              // Transaction history
              TransactionHistory(
                creditList: mockStatement.creditList,
                debitList: mockStatement.debitList,
              ),

              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
