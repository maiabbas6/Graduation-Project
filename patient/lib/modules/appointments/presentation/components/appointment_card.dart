import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:patient/core/utils/string_utils.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:get/get.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/appointment_model.dart';

class AppointmentCard extends StatelessWidget {
  final AppointmentModel appointment;
  final VoidCallback onTap;
  final VoidCallback? onLongPress;

  const AppointmentCard({
    super.key,
    required this.appointment,
    required this.onTap,
    this.onLongPress,
  });

  Color _getStatusColor() {
    switch (appointment.status) {
      case AppointmentStatus.pending: return AppColors.warning;
      case AppointmentStatus.canceled: return AppColors.error;
      case AppointmentStatus.waiting: return Colors.blue;
      case AppointmentStatus.suspended: return Colors.grey;
      case AppointmentStatus.closed: return AppColors.success;
    }
  }

  String _getTypeName() {
    return appointment.type.name.tr;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowColor,
            blurRadius: 5,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: InkWell(
        onTap: onTap,
        onLongPress: onLongPress,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  _getTypeName(),
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16.sp,
                    color: AppColors.textPrimary,
                  ),
                ),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                  decoration: BoxDecoration(
                    color: _getStatusColor().withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    appointment.status.name.capitalizeFirst!,
                    style: TextStyle(
                      color: _getStatusColor(),
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 1.h),
            Text(
              appointment.appointmentDateTime.formattedDateTime,
              style: TextStyle(fontSize: 13.sp, color: AppColors.textSecondary),
            ),
            SizedBox(height: 1.h),
            Text(
              appointment.description,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 13.sp, color: AppColors.textPrimary),
            ),
          ],
        ),
      ),
    );
  }
}
