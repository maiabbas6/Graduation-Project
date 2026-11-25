import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:doctor/core/utils/string_utils.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../patient/presentation/screens/patient_info_screen.dart';
import '../../data/models/appointment_model.dart';
import '../controllers/manage_appointment/manage_appointment_binding.dart';
import '../controllers/manage_appointment/manage_appointment_controller.dart';

class ManageAppointmentScreen extends GetView<ManageAppointmentController> {
  static const _name = '/manage-appointment';

  static final page = GetPage(
    name: _name,
    page: () => const ManageAppointmentScreen(),
    binding: ManageAppointmentBinding(),
  );

  const ManageAppointmentScreen({super.key});

  static void navigate(AppointmentModel appointment) {
    Get.toNamed(_name, arguments: appointment);
  }

  @override
  Widget build(BuildContext context) {
    final appointment = controller.appointment;

    return AppScaffold(
      appBar: AppBar(title: Text('Manage Appointment'.tr)),
      body: CustomScrollView(
        slivers: [
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                SizedBox(height: 2.h),
                _buildHeader(appointment),
                SizedBox(height: 2.h),
                _buildSectionTitle('Patient'.tr),
                SizedBox(height: 0.5.h),
                if (appointment.user != null)
                  GestureDetector(
                    onTap: () =>
                        PatientInfoScreen.navigate(appointment.user!.id),
                    child: AppInfoTile(
                      icon: Icons.person_outline,
                      label: 'Name (Tap for Profile)'.tr,
                      value: appointment.user!.fullName,
                    ),
                  ),
                if (appointment.user != null)
                  AppInfoTile(
                    icon: Icons.phone_outlined,
                    label: 'Phone'.tr,
                    value: appointment.user!.phone,
                  ),
                SizedBox(height: 2.h),
                _buildSectionTitle('Appointment Details'.tr),
                SizedBox(height: 0.5.h),
                AppInfoTile(
                  icon: Icons.calendar_today,
                  label: 'Date & Time'.tr,
                  value: appointment.appointmentDateTime.formattedDateTime,
                ),
                AppInfoTile(
                  icon: Icons.category_outlined,
                  label: 'Type'.tr,
                  value: appointment.type.name.capitalizeFirst!,
                ),
                AppInfoTile(
                  icon: Icons.description_outlined,
                  label: 'Description'.tr,
                  value: appointment.description,
                ),
                SizedBox(height: 3.h),
                if (appointment.status != AppointmentStatus.closed)
                  _buildCloseSection(),
                SizedBox(height: 4.h),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCloseSection() {
    return Obx(
      () => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Close Appointment'.tr),
          SizedBox(height: 1.h),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Column(
              children: [
                DropdownButtonFormField<String>(
                  value: controller.medicalRecordType.value,
                  decoration: InputDecoration(
                    labelText: 'Medical Record Type'.tr,
                    border: OutlineInputBorder(),
                  ),
                  items: ManageAppointmentController.medicalRecordTypes
                      .map((type) => DropdownMenuItem(
                            value: type,
                            child: Text(type.capitalizeFirst!),
                          ))
                      .toList(),
                  onChanged: (value) {
                    if (value != null) {
                      controller.medicalRecordType.value = value;
                    }
                  },
                ),
                SizedBox(height: 2.h),
                TextField(
                  controller: controller.descriptionController,
                  maxLines: 4,
                  maxLength: 1024,
                  decoration: InputDecoration(
                    labelText: 'Description'.tr,
                    hintText: 'Enter diagnosis or treatment details...'.tr,
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 2.h),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.error,
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(vertical: 1.5.h),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: controller.isLoading.value
                        ? null
                        : () => controller.closeAppointment(),
                    icon: controller.isLoading.value
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Icon(Icons.check_circle_outline),
                    label: Text(
                      controller.isLoading.value
                          ? 'Closing...'.tr
                          : 'Close Appointment'.tr,
                      style: TextStyle(fontSize: 14.sp),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(AppointmentModel appointment) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 3.h, horizontal: 4.w),
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
            'Manage'.tr,
            style: TextStyle(
              fontSize: 20.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.surface,
            ),
          ),
          SizedBox(height: 1.h),
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
}
