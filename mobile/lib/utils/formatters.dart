import 'package:intl/intl.dart';

String formatCurrency(double amount) {
  final formatter = NumberFormat.currency(
    locale: 'pt_PT',
    symbol: '€',
    decimalDigits: 2,
  );
  return formatter.format(amount);
}

String formatDate(DateTime date) {
  return DateFormat('dd-MM-yyyy').format(date);
}

String formatShortDate(DateTime date) {
  return DateFormat('dd-MM').format(date);
}

String formatMonthYear(DateTime date) {
  return DateFormat('MMMM yyyy').format(date);
}
