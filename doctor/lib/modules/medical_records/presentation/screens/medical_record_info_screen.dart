import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/medical_record_detail_model.dart';
import '../controllers/medical_record_info/medical_record_info_binding.dart';
import '../controllers/medical_record_info/medical_record_info_controller.dart';

class MedicalRecordInfoScreen
    extends GetView<MedicalRecordInfoController> {
  static const _name = '/medical-record-info';

  static final page = GetPage(
    name: _name,
    page: () => const MedicalRecordInfoScreen(),
    binding: MedicalRecordInfoBinding(),
  );

  const MedicalRecordInfoScreen({super.key});

  static void navigate(int medicalRecordId) {
    Get.toNamed(_name, arguments: medicalRecordId);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: Text('Medical Record'.tr)),
      body: CustomScrollView(
        slivers: [
          ControllerComponent.sliver<MedicalRecordDetailModel,
              MedicalRecordInfoController>(
            onSuccess: (_, record) => SliverList(
              delegate: SliverChildListDelegate([
                _buildHeader(record),
                SizedBox(height: 2.h),
                if (record.user != null) ...[
                  _buildSectionTitle('Patient'.tr),
                  SizedBox(height: 0.5.h),
                  AppInfoTile(
                    icon: Icons.person_outline,
                    label: 'Name'.tr,
                    value: record.user!.fullName,
                  ),
                  AppInfoTile(
                    icon: Icons.phone_outlined,
                    label: 'Phone'.tr,
                    value: record.user!.phone,
                  ),
                  AppInfoTile(
                    icon: Icons.wc,
                    label: 'Gender'.tr,
                    value: record.user!.gender,
                  ),
                  AppInfoTile(
                    icon: Icons.location_on_outlined,
                    label: 'Address'.tr,
                    value: record.user!.address,
                  ),
                ],
                if (record.employee != null) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Doctor'.tr),
                  SizedBox(height: 0.5.h),
                  AppInfoTile(
                    icon: Icons.person_outline,
                    label: 'Name'.tr,
                    value: record.employee!.user?.fullName ?? '',
                  ),
                  AppInfoTile(
                    icon: Icons.medical_services_outlined,
                    label: 'Specialization'.tr,
                    value: record.employee!.specialization,
                  ),
                  AppInfoTile(
                    icon: Icons.badge_outlined,
                    label: 'License No.'.tr,
                    value: record.employee!.licenseNo,
                  ),
                ],
                SizedBox(height: 2.h),
                _buildSectionTitle('Record Details'.tr),
                SizedBox(height: 0.5.h),
                AppInfoTile(
                  icon: Icons.calendar_today,
                  label: 'Date'.tr,
                  value: record.date.toLocal().toString().split(' ').first,
                ),
                AppInfoTile(
                  icon: Icons.category_outlined,
                  label: 'Type'.tr,
                  value: record.type,
                ),
                SizedBox(height: 2.h),
                _buildSectionTitle('Description'.tr),
                SizedBox(height: 0.5.h),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  child: Text(
                    record.description,
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: AppColors.textPrimary,
                    ),
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

  Widget _buildHeader(MedicalRecordDetailModel record) {
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
            record.type,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.surface,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            record.date.toLocal().toString().split(' ').first,
            style: TextStyle(
              fontSize: 14.sp,
              color: AppColors.surface.withOpacity(0.85),
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
