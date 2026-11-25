import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../constants/color_const.dart';


class AppBackButton extends StatelessWidget {
  const AppBackButton({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
        onPressed: Get.back,
        icon: CircleAvatar(
          backgroundColor: AppColors.background,
          foregroundColor: AppColors.primary,
          child: Icon(CupertinoIcons.back),
        )
    );
  }
}
