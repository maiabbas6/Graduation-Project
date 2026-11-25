import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:patient/core/constants/app_images.dart';
import 'package:patient/core/constants/color_const.dart';
import 'package:patient/core/core_components/theme/app_theme.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../screens/create_appointment_screen.dart';

/// A cool card that prompts the user to start a new appointment flow.
/// Tapping it triggers the provided [onTap] callback.
class NewAppointmentCard extends StatelessWidget {

  const NewAppointmentCard({super.key,});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: ()=> Get.toNamed(CreateAppointmentScreen.route),
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
        padding: EdgeInsets.all(4.w),
        height: 20.vmin,
        decoration: BoxDecoration(
          color: context.theme.primaryColor,
          borderRadius: AppTheme.defaultBorderRadius,
          boxShadow: AppTheme.defaultShadow,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Get New Appointment',
              style: TextStyle(
                color: AppColors.background,
                fontWeight: FontWeight.w500
              ),
            ),
            SizedBox(width: 2.w),
            
            SvgPicture.asset(SvgConst.appointment,colorFilter: ColorFilter.mode(AppColors.background, BlendMode.srcIn),)
            
          ],
        ),
      ),
    );
  }
}