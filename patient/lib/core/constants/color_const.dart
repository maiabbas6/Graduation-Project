

import 'package:flutter/material.dart';
class _ColorConst {
  static const deepForestGreen = Color(0xFF006837); // Primary brand green
  static const mintGreen = Color(0xFFD0E7D2);       // Light green accents/backgrounds
  static const white = Colors.white;
  static const black = Color(0xFF1A1A1A);           // Dark charcoal for readable text
  static const lightGrey = Color(0xFFF5F7F5);       // App background / Card background
  static const borderGrey = Color(0xFFE0E0E0);      // Soft gray for input borders and dividers
  static const textGrey = Color(0xFF757575);        // Secondary muted text
  static const statusRed = Color(0xFFD32F2F);       // High / Urgent status text
  static const statusOrange = Color(0xFFF57C00);    // Pending status text
}

class AppColors {
  // Brand Colors
  static const primary = _ColorConst.deepForestGreen;
  static const secondary = _ColorConst.mintGreen;
  static const background = _ColorConst.lightGrey;
  static const surface = _ColorConst.white;

  // Buttons
  static const buttonColor = _ColorConst.deepForestGreen;
  static const buttonColorFont = _ColorConst.white;

  // Text Colors
  static const textPrimary = _ColorConst.black;
  static const textSecondary = _ColorConst.textGrey;
  static const textLight = _ColorConst.white;

  // Status Colors
  static const error = _ColorConst.statusRed;
  static const warning = _ColorConst.statusOrange;
  static const success = _ColorConst.deepForestGreen;

  // UI Elements
  static const border = _ColorConst.borderGrey;
  static final shadowColor = Colors.black.withOpacity(0.05);
}