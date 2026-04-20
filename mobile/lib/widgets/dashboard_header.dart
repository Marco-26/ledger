import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../utils/formatters.dart';

class DashboardHeader extends StatelessWidget {
  final DateTime selectedMonth;
  final VoidCallback onPreviousMonth;
  final VoidCallback onNextMonth;
  final VoidCallback onThemeToggle;
  final bool isDark;

  const DashboardHeader({
    super.key,
    required this.selectedMonth,
    required this.onPreviousMonth,
    required this.onNextMonth,
    required this.onThemeToggle,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDarkMode = theme.brightness == Brightness.dark;
    final borderColor = isDarkMode ? AppColors.darkBorder : AppColors.border;
    final mutedFg = isDarkMode
        ? AppColors.darkMutedForeground
        : AppColors.mutedForeground;
    final cardBg = isDarkMode ? AppColors.darkCard : AppColors.card;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Title row
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'PERSONAL FINANCE',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w500,
                      letterSpacing: 2.0,
                      color: mutedFg,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text('Ledger', style: theme.textTheme.displayLarge),
                ],
              ),
            ),
            // Theme toggle
            GestureDetector(
              onTap: onThemeToggle,
              child: Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  border: Border.all(color: borderColor),
                  borderRadius: BorderRadius.circular(8),
                  color: cardBg,
                ),
                child: Icon(
                  isDarkMode
                      ? Icons.light_mode_outlined
                      : Icons.dark_mode_outlined,
                  size: 16,
                  color: mutedFg,
                ),
              ),
            ),
          ],
        ),

        const SizedBox(height: 20),

        // Divider
        Divider(color: borderColor, height: 1, thickness: 1),

        const SizedBox(height: 20),

        // Month navigator
        Container(
          height: 40,
          decoration: BoxDecoration(
            color: isDarkMode ? AppColors.darkMuted : AppColors.muted,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: borderColor),
          ),
          child: Row(
            children: [
              _NavButton(
                icon: Icons.chevron_left,
                onTap: onPreviousMonth,
                borderColor: borderColor,
                iconColor: mutedFg,
              ),
              Container(width: 1, height: 40, color: borderColor),
              Expanded(
                child: Center(
                  child: Text(
                    formatMonthYear(selectedMonth),
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: theme.textTheme.bodyMedium?.color,
                    ),
                  ),
                ),
              ),
              Container(width: 1, height: 40, color: borderColor),
              _NavButton(
                icon: Icons.chevron_right,
                onTap: onNextMonth,
                borderColor: borderColor,
                iconColor: mutedFg,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _NavButton extends StatefulWidget {
  final IconData icon;
  final VoidCallback onTap;
  final Color borderColor;
  final Color iconColor;

  const _NavButton({
    required this.icon,
    required this.onTap,
    required this.borderColor,
    required this.iconColor,
  });

  @override
  State<_NavButton> createState() => _NavButtonState();
}

class _NavButtonState extends State<_NavButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: 40,
          height: 40,
          color: _hovered
              ? widget.borderColor.withValues(alpha: 0.3)
              : Colors.transparent,
          child: Icon(widget.icon, size: 16, color: widget.iconColor),
        ),
      ),
    );
  }
}
