import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/appointment_model.dart';

class NextAppointmentComponent extends StatelessWidget {
  final AppointmentModel? appointment;

  const NextAppointmentComponent({super.key, this.appointment});

  @override
  Widget build(BuildContext context) {
    if (appointment == null) {
      return Padding(
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
        child: Container(
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
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.event_note,
                    color: AppColors.primary,
                    size: 5.vmin,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Next Appointment',
                    style: TextStyle(
                      fontSize: 16.sp,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              Row(
                children: [
                  Icon(
                    Icons.event_busy,
                    color: AppColors.textSecondary,
                    size: 5.vmin,
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Text(
                      'No upcoming appointments',
                      style: TextStyle(
                        fontSize: 14.sp,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    }

    final emp = appointment!.employee;
    final doctorName = emp?.user != null
        ? 'Dr. ${emp!.user!.firstName} ${emp.user!.lastName}'
        : 'Unknown Doctor';
    final specialization = emp?.specialization ?? '';
    final initials = emp?.initials ?? '?';
    final roomName = appointment!.room?.name ?? '';
    final dateStr = DateFormat('dd MMM yyyy').format(appointment!.appointmentDateTime);
    final timeStr = DateFormat('hh:mm a').format(appointment!.appointmentDateTime);

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Container(
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
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  Icons.event_note,
                  color: AppColors.primary,
                  size: 5.vmin,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Next Appointment',
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                CircleAvatar(
                  radius: 5.vmin,
                  backgroundColor: AppColors.primary,
                  child: Text(
                    initials,
                    style: TextStyle(
                      color: AppColors.buttonColorFont,
                      fontWeight: FontWeight.bold,
                      fontSize: 14.sp,
                    ),
                  ),
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        doctorName,
                        style: TextStyle(
                          fontSize: 15.sp,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      if (specialization.isNotEmpty) ...[
                        SizedBox(height: 0.3.h),
                        Text(
                          specialization,
                          style: TextStyle(
                            fontSize: 12.sp,
                            color: AppColors.primary,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.h),
            Divider(color: AppColors.border),
            SizedBox(height: 1.h),
            Row(
              children: [
                Icon(Icons.calendar_today, size: 4.vmin, color: AppColors.textSecondary),
                SizedBox(width: 2.w),
                Text(
                  dateStr,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: AppColors.textPrimary,
                  ),
                ),
                SizedBox(width: 4.w),
                Icon(Icons.access_time, size: 4.vmin, color: AppColors.textSecondary),
                SizedBox(width: 2.w),
                Text(
                  timeStr,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            if (roomName.isNotEmpty) ...[
              SizedBox(height: 1.h),
              Row(
                children: [
                  Icon(Icons.location_on, size: 4.vmin, color: AppColors.textSecondary),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: Text(
                      roomName,
                      style: TextStyle(
                        fontSize: 13.sp,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
