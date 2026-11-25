
import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../constants/color_const.dart';

class AppTheme {


  static ThemeData get theme => ThemeData(
    colorScheme: ColorScheme(
      brightness: Brightness.light,
      primary: AppColors.primary,
      onPrimary: AppColors.buttonColorFont,
      secondary: AppColors.textSecondary,
      onSecondary: AppColors.textPrimary,
      error: AppColors.error,
      onError: AppColors.background,
      surface: AppColors.background,
      onSurface: AppColors.textPrimary,
    ),
    scaffoldBackgroundColor: AppColors.background,
    primaryColor: AppColors.primary
  );

  static final defaultShadow = [
    BoxShadow(
        color: AppColors.shadowColor,
        blurRadius: 5,
        spreadRadius: 2,
        offset: Offset(-0.25.vmin, -0.25.vmin)
    ),
    BoxShadow(
        color: AppColors.shadowColor,
        blurRadius: 5,
        spreadRadius: 2,
        offset: Offset(0.25.vmin, 0.25.vmin)
    ),
  ];

  static final lightShadow = [
    BoxShadow(
        color: AppColors.shadowColor.withAlpha(200),
        blurRadius: 3.5,
        spreadRadius: 1.5,
        offset: Offset(-0.25.vmin, -0.25.vmin)
    ),
    BoxShadow(
        color: AppColors.shadowColor.withAlpha(200),
        blurRadius: 3.5,
        spreadRadius: 1.5,
        offset: Offset(0.25.vmin, 0.25.vmin)
    ),
  ];

  static final defaultBorderRadius = BorderRadius.circular(2.5.vmin);
  
  static final shimmerGradient = LinearGradient(
      colors: [
        AppColors.shadowColor,
        AppColors.shadowColor.withAlpha(126),
        AppColors.shadowColor,
        AppColors.shadowColor.withAlpha(126),
        AppColors.shadowColor,
      ],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
  );

}