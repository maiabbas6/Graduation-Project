import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../constants/color_const.dart';

class AppInfoTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final bool active;

  const AppInfoTile({
    super.key,
    required this.icon,
    required this.label,
    required this.value,
    this.active = false,
  });

  @override
  Widget build(BuildContext context) {
    final lt = ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Icon(icon, color: active ? AppColors.background : AppColors.primary),
        title: Text(
          label,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            fontSize: 14.sp,
            color: active ? AppColors.background :AppColors.textSecondary,
          ),
        ),
        subtitle: Text(
          value,
          style: TextStyle(
            fontSize: 14.sp,
            fontWeight: FontWeight.w500,
            color: AppColors.textPrimary,
          ),
        ),
      );
      if(active){
        return Card(
          child: lt,
          color: AppColors.primary,
        );    
      }
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.vmin),
      child: lt,
    );
  }
}
