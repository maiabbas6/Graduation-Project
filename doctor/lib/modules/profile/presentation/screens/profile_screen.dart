import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_bottom_nav_bar.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../../../core/storage/storage_handler.dart';
import '../components/profile_appointment_card.dart';
import '../components/profile_header_component.dart';
import '../components/profile_medical_record_card.dart';
import '../controllers/profile/profile_controller.dart';
import '../controllers/profile/profile_binding.dart';

class ProfileScreen extends GetView<ProfileController> {
  static const name = '/profile';

  static final page = GetPage(
    name: name,
    page: () => const ProfileScreen(),
    binding: ProfileBinding(),
  );

  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        slivers: [
          GetBuilder<ProfileController>(
            builder: (controller) => StatusComponent.sliver(
              state: controller.dataState,
              onSuccess: (context, profile) => SliverList(
                delegate: SliverChildListDelegate([
                  ProfileHeaderComponent(profile: profile),
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Personal Information'.tr),
                  SizedBox(height: 1.h),
                  AppInfoTile(
                    icon: Icons.person_outline,
                    label: 'Gender'.tr,
                    value: profile.gender.isEmpty
                        ? 'N/A'.tr
                        : profile.gender.capitalizeFirst!,
                  ),
                  AppInfoTile(
                    icon: Icons.calendar_today,
                    label: 'Birth Date'.tr,
                    value: DateFormat('MMM dd, yyyy').format(profile.birth),
                  ),
                  AppInfoTile(
                    icon: Icons.location_on_outlined,
                    label: 'Address'.tr,
                    value: profile.address,
                  ),
                  if (profile.employee != null) ...[
                    SizedBox(height: 2.h),
                    _buildSectionTitle('Professional Info'.tr),
                    SizedBox(height: 1.h),
                    AppInfoTile(
                      icon: Icons.work_outline,
                      label: 'Specialization'.tr,
                      value: profile.employee!.specialization,
                    ),
                    AppInfoTile(
                      icon: Icons.badge_outlined,
                      label: 'License No'.tr,
                      value: profile.employee!.licenseNo,
                    ),
                    AppInfoTile(
                      icon: Icons.attach_money,
                      label: 'Hour Rate'.tr,
                      value: '${profile.employee!.hourRate}',
                    ),
                    AppInfoTile(
                      icon: Icons.assignment_outlined,
                      label: 'Qualifications'.tr,
                      value: profile.employee!.qualifications,
                    ),
                    AppInfoTile(
                      icon: Icons.event,
                      label: 'Contract End'.tr,
                      value: profile.employee!.contractEndDate.split('T').first,
                    ),
                  ],
                  if (profile.medicalRecords.isNotEmpty) ...[
                    SizedBox(height: 2.h),
                    _buildSectionTitle('Medical Records'.tr),
                    SizedBox(height: 0.5.h),
                    ...profile.medicalRecords.map(
                      (record) => ProfileMedicalRecordCard(record: record),
                    ),
                  ],
                  if (profile.appointments.isNotEmpty) ...[
                    SizedBox(height: 2.h),
                    _buildSectionTitle('Appointments'.tr),
                    SizedBox(height: 0.5.h),
                    ...profile.appointments.map(
                      (appointment) => ProfileAppointmentCard(appointment: appointment),
                    ),
                  ],
                  Divider(),
                  _buildLanguageSwitch(),
                  SizedBox(height: 2.vmin),
                  AppButton(
                    title: 'Logout'.tr,
                    buttonColor: AppColors.error,
                    onTap: controller.logout,
                    margin: EdgeInsets.symmetric(horizontal: 15.vmin),
                  ),
                  SizedBox(height: 25.vmin),
                ]),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNavBar(currentIndex: 2),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Text(
        title.tr,
        style: TextStyle(
          fontSize: 16.sp,
          fontWeight: FontWeight.bold,
          color: AppColors.textPrimary,
        ),
      ),
    );
  }

  Widget _buildLanguageSwitch() {
    final currentLang = Get.locale?.languageCode ?? 'en';
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.primary.withOpacity(0.15)),
        ),
        child: Column(
          children: [
            ListTile(
              leading: Icon(Icons.language, color: AppColors.primary),
              title: Text('Language'.tr),
              trailing: Icon(Icons.chevron_right, color: AppColors.textSecondary),
              onTap: () => _showLanguageDialog(currentLang),
            ),
          ],
        ),
      ),
    );
  }

  void _showLanguageDialog(String currentLang) {
    Get.dialog(
      AlertDialog(
        title: Text('Language'.tr),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile<String>(
              title: Text('English'),
              value: 'en',
              groupValue: currentLang,
              activeColor: AppColors.primary,
              onChanged: (value) => _changeLanguage(value!),
            ),
            RadioListTile<String>(
              title: Text('Arabic'),
              value: 'ar',
              groupValue: currentLang,
              activeColor: AppColors.primary,
              onChanged: (value) => _changeLanguage(value!),
            ),
          ],
        ),
      ),
    );
  }

  void _changeLanguage(String langCode) {
    final locale = Locale(langCode);
    StorageHandler().setLanguage(langCode);
    Get.updateLocale(locale);
    Get.back();
  }
}
