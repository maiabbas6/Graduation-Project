import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_bottom_nav_bar.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../../../core/storage/storage_handler.dart';
import '../components/profile_appointment_card.dart';
import '../components/profile_header_component.dart';
import '../components/profile_info_tile.dart';
import '../components/profile_medical_record_card.dart';
import './medical_record_info_screen.dart';
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

  void _switchLanguage(String lang) {
    final locale = lang == 'ar' ? const Locale('ar', 'SY') : const Locale('en', 'US');
    Get.updateLocale(locale);
    StorageHandler().setLanguage(lang);
  }

  @override
  Widget build(BuildContext context) {
    final currentLang = StorageHandler().language;

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
                  ProfileInfoTile(
                    icon: Icons.calendar_today,
                    label: 'Birth Date'.tr,
                    value: DateFormat('MMM dd, yyyy').format(profile.birth),
                  ),
                  ProfileInfoTile(
                    icon: Icons.location_on_outlined,
                    label: 'Address'.tr,
                    value: profile.address,
                  ),
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Language'.tr),
                  SizedBox(height: 1.h),
                  _buildLanguageSwitcher(currentLang),
                  if (profile.medicalRecords.isNotEmpty) ...[
                    SizedBox(height: 2.h),
                    _buildSectionTitle('Medical Records'.tr),
                    SizedBox(height: 0.5.h),
                    ...profile.medicalRecords.map(
                      (record) => ProfileMedicalRecordCard(
                        record: record,
                        onTap: () => MedicalRecordInfoScreen.navigate(record.id),
                      ),
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
                  SizedBox(height: 4.h),
                ]),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNavBar(currentIndex: 3),
    );
  }

  Widget _buildLanguageSwitcher(String currentLang) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Container(
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
          children: [
            _buildLanguageOption(
              title: 'English'.tr,
              value: 'en',
              currentLang: currentLang,
            ),
            Divider(height: 1, color: AppColors.border),
            _buildLanguageOption(
              title: 'Arabic'.tr,
              value: 'ar',
              currentLang: currentLang,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLanguageOption({
    required String title,
    required String value,
    required String currentLang,
  }) {
    final isSelected = currentLang == value;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => _switchLanguage(value),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
          child: Row(
            children: [
              Icon(
                Icons.language,
                color: isSelected ? AppColors.primary : AppColors.textSecondary,
                size: 5.vmin,
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 15.sp,
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                    color: isSelected ? AppColors.primary : AppColors.textPrimary,
                  ),
                ),
              ),
              if (isSelected)
                Icon(
                  Icons.check_circle,
                  color: AppColors.primary,
                  size: 5.vmin,
                ),
            ],
          ),
        ),
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
}
