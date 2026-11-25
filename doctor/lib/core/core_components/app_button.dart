import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:responsive_sizer/responsive_sizer.dart';

import '../constants/color_const.dart';


class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    this.onTap,
    this.title,
    this.isLoading = false,
    this.swapColors = false,
    this.active = true,
    this.width,
    this.height,
    this.margin,
    this.padding,
    this.fontColor,
    this.buttonColor,
    this.inActiveColor,
    this.fontSize,
  });

  final VoidCallback? onTap;
  final String? title;
  final bool isLoading;
  final bool swapColors;
  final bool active;
  final double? width;
  final double? height;
  final double? fontSize;
  final EdgeInsets? margin;
  final EdgeInsets? padding;
  final Color? fontColor;
  final Color? buttonColor;
  final Color? inActiveColor;


  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (isLoading || !active) ? null:onTap,
      child: Container(
        decoration: BoxDecoration(
          color: active ? (buttonColor ?? AppColors.buttonColor):(inActiveColor ?? AppColors.shadowColor),
          borderRadius: BorderRadius.circular(1.25.vmin)
        ),
        margin: margin ?? EdgeInsets.symmetric(vertical: 1.25.vmin),
        alignment: Alignment.center,
        height: height ?? 12.5.vmin,
        padding: padding,
        width: width,
        child:
            isLoading
                ? CircularProgressIndicator(
                  color: fontColor ?? AppColors.buttonColorFont,
                )
                : Text(
                  title ?? 'Submit'.tr,
                  style: TextStyle(
                    color: fontColor ?? AppColors.buttonColorFont,
                    fontSize: fontSize ??  18.sp,
                  ),
                ),
      ),
    );
  }
}
