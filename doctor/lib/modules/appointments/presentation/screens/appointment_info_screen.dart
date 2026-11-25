import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:doctor/core/utils/string_utils.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../patient/presentation/screens/patient_info_screen.dart';
import 'manage_appointment_screen.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/appointment_model.dart';
import '../controllers/appointment_info/appointment_info_binding.dart';
import '../controllers/appointment_info/appointment_info_controller.dart';

class AppointmentInfoScreen extends GetView<AppointmentInfoController> {
  static const _name = '/appointment-info';

  static final page = GetPage(
    name: _name,
    page: () => const AppointmentInfoScreen(),
    binding: AppointmentInfoBinding(),
  );

  const AppointmentInfoScreen({super.key});

  static void navigate(AppointmentModel appointment) {
    Get.toNamed(_name, arguments: appointment);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: Text('Appointment Details'.tr)),
      body: CustomScrollView(
        slivers: [
          ControllerComponent.sliver<AppointmentModel, AppointmentInfoController>(
            onSuccess: (_, appointment) => SliverList(
              delegate: SliverChildListDelegate([
                _buildHeader(appointment),
                SizedBox(height: 2.h),
                if (appointment.user != null) ...[
                  _buildSectionTitle('Patient'.tr),
                  SizedBox(height: 0.5.h),
                  GestureDetector(
                    onTap: () => PatientInfoScreen.navigate(appointment.user!.id),
                    child: AppInfoTile(
                      icon: Icons.person_outline,
                      label: 'Name (Tap for Profile)'.tr,
                      value: appointment.user!.fullName,
                    ),
                  ),
                  AppInfoTile(
                    icon: Icons.phone_outlined,
                    label: 'Phone'.tr,
                    value: appointment.user!.phone,
                  ),
                  AppInfoTile(
                    icon: Icons.location_on_outlined,
                    label: 'Address'.tr,
                    value: appointment.user!.address,
                  ),
                  AppInfoTile(
                    icon: Icons.wc,
                    label: 'Gender'.tr,
                    value: _capitalize(appointment.user!.gender),
                  ),
                  AppInfoTile(
                    icon: Icons.cake_outlined,
                    label: 'Birth Date'.tr,
                    value: _formatDate(appointment.user!.birth),
                  ),
                ],
                if (appointment.employee != null) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Doctor'.tr),
                  SizedBox(height: 0.5.h),
                  AppInfoTile(
                    icon: Icons.person_outline,
                    label: 'Name'.tr,
                    value: appointment.employee!.user?.fullName ?? '',
                  ),
                  AppInfoTile(
                    icon: Icons.medical_services_outlined,
                    label: 'Specialization'.tr,
                    value: appointment.employee!.specialization,
                  ),
                  AppInfoTile(
                    icon: Icons.badge_outlined,
                    label: 'License No.'.tr,
                    value: appointment.employee!.licenseNo,
                  ),
                  AppInfoTile(
                    icon: Icons.attach_money,
                    label: 'Hour Rate'.tr,
                    value:
                        '\$${appointment.employee!.hourRate.toStringAsFixed(2)}/hr',
                  ),
                  AppInfoTile(
                    icon: Icons.school_outlined,
                    label: 'Qualifications'.tr,
                    value: appointment.employee!.qualifications,
                  ),
                  if (appointment.employee!.user != null) ...[
                    AppInfoTile(
                      icon: Icons.phone_outlined,
                      label: 'Phone'.tr,
                      value: appointment.employee!.user!.phone,
                    ),
                    AppInfoTile(
                      icon: Icons.location_on_outlined,
                      label: 'Address'.tr,
                      value: appointment.employee!.user!.address,
                    ),
                  ],
                  AppInfoTile(
                    icon: Icons.verified_outlined,
                    label: 'Status'.tr,
                    value:
                        appointment.employee!.isActive ? 'Active'.tr : 'Inactive'.tr,
                  ),
                ],
                if (appointment.room != null) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Room'.tr),
                  SizedBox(height: 0.5.h),
                  AppInfoTile(
                    icon: Icons.meeting_room_outlined,
                    label: 'Room'.tr,
                    value: appointment.room!.name ?? '',
                  ),
                ],
                SizedBox(height: 2.h),
                _buildSectionTitle('Appointment'.tr),
                SizedBox(height: 0.5.h),
                AppInfoTile(
                  icon: Icons.calendar_today,
                  label: 'Date & Time'.tr,
                  value: appointment.appointmentDateTime.formattedDateTime,
                ),
                AppInfoTile(
                  icon: Icons.category_outlined,
                  label: 'Type'.tr,
                  value: _getTypeLabel(appointment.type),
                ),
                if (appointment.appointmentClosedAt != null) ...[
                  AppInfoTile(
                    icon: Icons.lock_clock_outlined,
                    label: 'Closed At'.tr,
                    value: appointment.appointmentClosedAt!.formattedDateTime,
                  ),
                ],
                SizedBox(height: 2.h),
                _buildSectionTitle('Description'.tr),
                SizedBox(height: 0.5.h),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  child: Text(
                    appointment.description,
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: AppColors.textPrimary,
                    ),
                  ),
                ),
                if (appointment.attachments != null &&
                    appointment.attachments!.isNotEmpty) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Attachments'.tr),
                  SizedBox(height: 0.5.h),
                  ...appointment.attachments!.map(
                    (attachment) => AppInfoTile(
                      icon: Icons.attach_file,
                      label: 'File'.tr,
                      value: attachment.path,
                    ),
                  ),
                ],
                SizedBox(height: 3.h),
                if (appointment.status != AppointmentStatus.closed)
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        padding: EdgeInsets.symmetric(vertical: 1.5.h),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onPressed: () =>
                          ManageAppointmentScreen.navigate(appointment),
                      icon: const Icon(Icons.settings_outlined),
                      label: Text('Manage'.tr, style: TextStyle(fontSize: 14.sp)),
                    ),
                  ),
                SizedBox(height: 4.h),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(AppointmentModel appointment) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 4.h, horizontal: 4.w),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(24),
          bottomRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          Text(
            _getTypeLabel(appointment.type),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.textLight,
            ),
          ),
          SizedBox(height: 1.5.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.calendar_today, size: 14.sp, color: AppColors.textLight),
              SizedBox(width: 1.5.w),
              Text(
                appointment.appointmentDateTime.formattedDateTime,
                style: TextStyle(fontSize: 14.sp, color: AppColors.textLight),
              ),
            ],
          ),
          SizedBox(height: 1.5.h),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.5.h),
            decoration: BoxDecoration(
              color: _getStatusColor(appointment.status).withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              appointment.status.name.capitalizeFirst!,
              style: TextStyle(
                fontSize: 13.sp,
                fontWeight: FontWeight.w600,
                color: _getStatusColor(appointment.status),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 16.sp,
          fontWeight: FontWeight.bold,
          color: AppColors.textPrimary,
        ),
      ),
    );
  }

  String _getTypeLabel(AppointmentType type) {
    return type.name
        .split(RegExp(r'(?=[A-Z])'))
        .map((s) => s.capitalizeFirst)
        .join(' ');
  }

  Color _getStatusColor(AppointmentStatus status) {
    switch (status) {
      case AppointmentStatus.pending:
        return AppColors.warning;
      case AppointmentStatus.canceled:
        return AppColors.error;
      case AppointmentStatus.waiting:
        return Colors.blue;
      case AppointmentStatus.suspended:
        return Colors.grey;
      case AppointmentStatus.closed:
        return AppColors.success;
    }
  }

  String _formatDate(String? value) {
    if (value == null || value.isEmpty) return '';
    return value.split('T').first;
  }

  String _capitalize(String? value) {
    if (value == null || value.isEmpty) return '';
    return value[0].toUpperCase() + value.substring(1);
  }
}
