import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/profile_model.dart';

class ProfileHeaderComponent extends StatelessWidget {
  final ProfileModel profile;

  const ProfileHeaderComponent({super.key, required this.profile});

  String get _initials {
    final parts = profile.fullName.split(' ');
    if (parts.length >= 2) {
      return '${parts.first[0]}${parts.last[0]}'.toUpperCase();
    }
    return profile.fullName[0].toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 4.h, horizontal: 4.w),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(24),
          bottomRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          CircleAvatar(
            radius: 28.sp,
            backgroundColor: AppColors.surface,
            child: Text(
              _initials,
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
                color: AppColors.primary,
              ),
            ),
          ),
          SizedBox(height: 1.5.h),
          Text(
            profile.fullName,
            style: TextStyle(
              fontSize: 18.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.textLight,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            profile.phone,
            style: TextStyle(
              fontSize: 14.sp,
              color: AppColors.textLight.withOpacity(0.8),
            ),
          ),
        ],
      ),
    );
  }
}
