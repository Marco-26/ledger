import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/main.dart';

void main() {
  testWidgets('App renders smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const LedgerApp());
    expect(find.text('Ledger'), findsOneWidget);
  });
}
