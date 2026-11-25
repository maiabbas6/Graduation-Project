import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../constants/color_const.dart';
import 'theme/app_theme.dart';


class AppSelectorField<T> extends StatelessWidget {

  final String title;
  final Widget? icon;
  final Widget? prefixIcon;
  final EdgeInsets padding;
  final Color? color;
  final VoidCallback? onTap;
  final FormFieldValidator<T>? validator;
  final T? value;

  const AppSelectorField({
    super.key,
    required this.title,
    this.icon,
    this.prefixIcon,
    this.padding = EdgeInsets.zero,
    this.onTap, 
    this.validator,
    this.value, this.color,
  });

  @override
  Widget build(BuildContext context) {
    return FormField(
      key: ValueKey(value),
      validator: validator,
      initialValue: value,
      builder: (state) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: padding,
             
              child: ListTile(
                  shape: RoundedRectangleBorder(
                      borderRadius: AppTheme.defaultBorderRadius,
                  ),
                  tileColor: context.theme.colorScheme.onPrimary ,
                  onTap: onTap,
                  trailing: icon,
                  leading: prefixIcon,
                  iconColor: color,
                  title: Text(
                      title,
                      style: TextStyle(
                          fontSize: 16.sp,
                          color: color
                      ),
                  ),
                  dense: true,
              ),
            ),
            Visibility(
              visible: state.hasError,
              child: Padding(
                padding: EdgeInsets.symmetric(
                  vertical: .5.vmin,
                  horizontal: 4.5.vmin,
                ),
                child: Text(
                  state.errorText ?? '',
                  style: TextStyle(
                    color: context.theme.colorScheme.error,
                    fontSize: 15.sp,
                  ),
                ),
              ),
            ),
          ],
        );
      }
    );
  }
}
