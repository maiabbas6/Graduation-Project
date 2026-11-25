import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../data/models/patient_model.dart';
import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../../medical_records/presentation/screens/medical_plan_screen.dart';
import '../../../profile/presentation/components/profile_medical_record_card.dart';
import '../controllers/patient_info/patient_info_binding.dart';
import '../controllers/patient_info/patient_info_controller.dart';

class PatientInfoScreen extends GetView<PatientInfoController> {
  static const _name = '/patient-info';

  static final page = GetPage(
    name: _name,
    page: () => const PatientInfoScreen(),
    binding: PatientInfoBinding(),
  );

  const PatientInfoScreen({super.key});

  static void navigate(int userId) {
    Get.toNamed(_name, arguments: userId);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: Text('Patient Details'.tr)),
      body: CustomScrollView(
        slivers: [
          ControllerComponent.sliver<PatientModel, PatientInfoController>(
            onSuccess: (_, patient) => SliverList(
              delegate: SliverChildListDelegate([
                _buildHeader(patient),
                SizedBox(height: 2.h),
                _buildSectionTitle('Personal Information'.tr),
                SizedBox(height: 1.h),
                AppInfoTile(
                  icon: Icons.person_outline,
                  label: 'Full Name'.tr,
                  value: patient.fullName,
                ),
                AppInfoTile(
                  icon: Icons.phone_outlined,
                  label: 'Phone'.tr,
                  value: patient.phone,
                ),
                AppInfoTile(
                  icon: Icons.location_on_outlined,
                  label: 'Address'.tr,
                  value: patient.address,
                ),
                AppInfoTile(
                  icon: Icons.wc,
                  label: 'Gender'.tr,
                  value: patient.gender.isEmpty
                      ? 'N/A'.tr
                      : patient.gender.capitalizeFirst!,
                ),
                AppInfoTile(
                  icon: Icons.cake_outlined,
                  label: 'Birth Date'.tr,
                  value: DateFormat('MMM dd, yyyy').format(patient.birth),
                ),
                if (patient.medicalRecords.isNotEmpty) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Medical Records'.tr),
                  SizedBox(height: 0.5.h),
                  ...patient.medicalRecords.map(
                    (record) => GestureDetector(
                      onTap: () => MedicalPlanScreen.navigate(record.id),
                      child: ProfileMedicalRecordCard(record: record),
                    ),
                  ),
                ],
                SizedBox(height: 4.h),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(PatientModel patient) {
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
          CircleAvatar(
            radius: 28.sp,
            backgroundColor: AppColors.surface,
            child: Text(
              patient.fullName.isNotEmpty ? patient.fullName[0].toUpperCase() : 'P',
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
                color: AppColors.primary,
              ),
            ),
          ),
          SizedBox(height: 1.5.h),
          Text(
            patient.fullName,
            style: TextStyle(
              fontSize: 18.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.textLight,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            patient.phone,
            style: TextStyle(
              fontSize: 14.sp,
              color: AppColors.textLight.withOpacity(0.8),
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
}
