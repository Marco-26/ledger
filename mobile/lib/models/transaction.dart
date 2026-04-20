class Transaction {
  final DateTime date;
  final double credit;
  final double debit;
  final String description;

  const Transaction({
    required this.date,
    required this.credit,
    required this.debit,
    required this.description,
  });
}

class DailyFlow {
  final DateTime date;
  final double credit;
  final double debit;

  const DailyFlow({
    required this.date,
    required this.credit,
    required this.debit,
  });
}

class Statement {
  final DateTime date;
  final double debitTotal;
  final double creditTotal;
  final double netBalance;
  final int numberOfTransactions;
  final List<Transaction> topExpenses;
  final List<Transaction> topIncomes;
  final List<DailyFlow> dailyFlows;
  final List<Transaction> creditList;
  final List<Transaction> debitList;

  const Statement({
    required this.date,
    required this.debitTotal,
    required this.creditTotal,
    required this.netBalance,
    required this.numberOfTransactions,
    required this.topExpenses,
    required this.topIncomes,
    required this.dailyFlows,
    required this.creditList,
    required this.debitList,
  });
}
