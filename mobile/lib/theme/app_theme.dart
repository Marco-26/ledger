import 'package:flutter/material.dart';

class AppColors {
  // Income = deep emerald, Expense = coral red (matching CSS oklch values)
  static const income = Color(0xFF2D7A55);
  static const expense = Color(0xFFB94A2C);
  static const incomeMuted = Color(0xFFE8F5EE);
  static const expenseMuted = Color(0xFFFAEDE9);

  // Light theme
  static const background = Color(0xFFF8F6F2);
  static const card = Color(0xFFFFFFFF);
  static const foreground = Color(0xFF1A1A2E);
  static const border = Color(0xFFE0DAD0);
  static const muted = Color(0xFFF0EDE7);
  static const mutedForeground = Color(0xFF7A7A8C);

  // Dark theme
  static const darkBackground = Color(0xFF0F0F12);
  static const darkCard = Color(0xFF17171C);
  static const darkForeground = Color(0xFFF0EEE8);
  static const darkBorder = Color(0xFF2A2A35);
  static const darkMuted = Color(0xFF1E1E26);
  static const darkMutedForeground = Color(0xFF8A8A9A);
  static const darkIncomeMuted = Color(0xFF0D2B1C);
  static const darkExpenseMuted = Color(0xFF2B1210);
}

class AppTheme {
  static ThemeData get light => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColors.background,
    colorScheme: const ColorScheme.light(
      surface: AppColors.background,
      onSurface: AppColors.foreground,
      primary: AppColors.foreground,
      onPrimary: AppColors.card,
      outline: AppColors.border,
    ),
    cardTheme: const CardThemeData(
      color: AppColors.card,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(12)),
        side: BorderSide(color: AppColors.border),
      ),
      margin: EdgeInsets.zero,
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(
        fontSize: 40,
        fontWeight: FontWeight.w700,
        color: AppColors.foreground,
        letterSpacing: -1.0,
        height: 1.0,
      ),
      titleMedium: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: AppColors.foreground,
      ),
      titleSmall: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: AppColors.foreground,
      ),
      bodyMedium: TextStyle(fontSize: 14, color: AppColors.foreground),
      bodySmall: TextStyle(fontSize: 12, color: AppColors.mutedForeground),
      labelSmall: TextStyle(
        fontSize: 10,
        fontWeight: FontWeight.w500,
        color: AppColors.mutedForeground,
        letterSpacing: 0.12 * 10,
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.border,
      thickness: 1,
      space: 0,
    ),
    tabBarTheme: TabBarThemeData(
      labelColor: AppColors.foreground,
      unselectedLabelColor: AppColors.mutedForeground,
      indicatorColor: AppColors.foreground,
      dividerColor: Colors.transparent,
      labelStyle: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
      unselectedLabelStyle: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
    ),
  );

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.darkBackground,
    colorScheme: const ColorScheme.dark(
      surface: AppColors.darkBackground,
      onSurface: AppColors.darkForeground,
      primary: AppColors.darkForeground,
      onPrimary: AppColors.darkCard,
      outline: AppColors.darkBorder,
    ),
    cardTheme: const CardThemeData(
      color: AppColors.darkCard,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(12)),
        side: BorderSide(color: AppColors.darkBorder),
      ),
      margin: EdgeInsets.zero,
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(
        fontSize: 40,
        fontWeight: FontWeight.w700,
        color: AppColors.darkForeground,
        letterSpacing: -1.0,
        height: 1.0,
      ),
      titleMedium: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: AppColors.darkForeground,
      ),
      titleSmall: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: AppColors.darkForeground,
      ),
      bodyMedium: TextStyle(fontSize: 14, color: AppColors.darkForeground),
      bodySmall: TextStyle(fontSize: 12, color: AppColors.darkMutedForeground),
      labelSmall: TextStyle(
        fontSize: 10,
        fontWeight: FontWeight.w500,
        color: AppColors.darkMutedForeground,
        letterSpacing: 1.2,
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.darkBorder,
      thickness: 1,
      space: 0,
    ),
    tabBarTheme: TabBarThemeData(
      labelColor: AppColors.darkForeground,
      unselectedLabelColor: AppColors.darkMutedForeground,
      indicatorColor: AppColors.darkForeground,
      dividerColor: Colors.transparent,
      labelStyle: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
      unselectedLabelStyle: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
    ),
  );
}
