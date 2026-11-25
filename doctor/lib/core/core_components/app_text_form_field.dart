import 'package:flutter/material.dart';

import 'package:responsive_sizer/responsive_sizer.dart';

import '../constants/color_const.dart';
import 'theme/app_theme.dart';

class AppTextFormField extends StatelessWidget {
  final TextEditingController? controller;
  final String? hint;
  final String? label;
  final String? title;
  final Widget? icon;
  final Widget? suffix;
  final bool isPass;
  final FormFieldValidator<String>? validator;
  final TextInputType? keyboardType;
  final int maxLines;
  final EdgeInsets padding;
  final EdgeInsets margin;
  final ValueChanged<String>? onChanged;

  const AppTextFormField({
    super.key,
    this.controller,
    this.onChanged,
    this.hint,
    this.label,
    this.title,
    this.icon,
    this.suffix,
    this.isPass = false,
    this.validator,
    this.keyboardType,
    this.maxLines = 1,
    this.padding = EdgeInsets.zero,
    this.margin = EdgeInsets.zero,
  });

  @override
  Widget build(BuildContext context) {
    MediaQuery.of(context);
    var border = OutlineInputBorder(
      borderSide:  BorderSide.none,
      borderRadius: AppTheme.defaultBorderRadius,
    );

    var focusedBorder = OutlineInputBorder(
      borderSide: const BorderSide(color: AppColors.primary),
      borderRadius: AppTheme.defaultBorderRadius,
    );

    return Container(
      padding: padding,
      margin: margin,
      decoration: BoxDecoration(
        borderRadius: border.borderRadius,
      ),
      child: TextFormField(
        controller: controller,
        obscureText: isPass,
        keyboardType: keyboardType,
        maxLines: maxLines,
        onChanged: onChanged,
        decoration: InputDecoration(
          focusedBorder: focusedBorder,
          errorBorder: border.copyWith(
            borderSide: const BorderSide(
              width: 1,
              color: AppColors.error
            ),
          ),
          enabledBorder: border,
          border: border,
          errorMaxLines: 2,
          labelText: label,
          hintText: hint,
          hintStyle: const TextStyle(
            color: AppColors.textSecondary
          ),
          prefixIcon: icon,
          suffixIcon: suffix,

          isDense: true,
          filled: true,
          fillColor: AppColors.surface,
        ),
        validator: validator,
      ),
    );
  }
}
