import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/medical_record_detail_model.dart';
import '../controllers/medical_plan/medical_plan_binding.dart';
import '../controllers/medical_plan/medical_plan_controller.dart';

class MedicalPlanScreen extends GetView<MedicalPlanController> {
  static const _name = '/medical-plan';

  static final page = GetPage(
    name: _name,
    page: () => const MedicalPlanScreen(),
    binding: MedicalPlanBinding(),
  );

  const MedicalPlanScreen({super.key});

  static void navigate(int medicalRecordId) {
    Get.toNamed(_name, arguments: medicalRecordId);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: Text('Medical Plan'.tr)),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }
        final record = controller.record.value;
        if (record == null) {
          return Center(
            child: Text('No data'.tr,
                style: TextStyle(fontSize: 15.sp, color: Colors.grey)),
          );
        }
        return CustomScrollView(
          slivers: [
            SliverList(
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
                        fontSize: 14.sp, color: AppColors.textPrimary),
                  ),
                ),
                SizedBox(height: 2.h),
                _buildSectionTitle('Medical Plans'.tr),
                SizedBox(height: 0.5.h),
                _buildPlansList(record),
                SizedBox(height: 2.h),
                _buildAddForm(),
                SizedBox(height: 4.h),
              ]),
            ),
          ],
        );
      }),
    );
  }

  Widget _buildPlansList(MedicalRecordDetailModel record) {
    if (record.medicalPlans.isEmpty) {
      return Padding(
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        child: Text(
          'No medical plans yet'.tr,
          style: TextStyle(fontSize: 13.sp, color: AppColors.textSecondary),
        ),
      );
    }
    return Column(
      children: record.medicalPlans
          .map((plan) => Container(
                margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.5.h),
                padding: EdgeInsets.all(3.w),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(12),
                  border:
                      Border.all(color: AppColors.primary.withOpacity(0.15)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            plan.title,
                            style: TextStyle(
                              fontSize: 14.sp,
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                            ),
                          ),
                        ),
                        Text(
                          plan.formattedDate,
                          style: TextStyle(
                            fontSize: 11.sp,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      plan.description,
                      style: TextStyle(
                        fontSize: 13.sp,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ))
          .toList(),
    );
  }

  Widget _buildAddForm() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.primary.withOpacity(0.15)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Add Medical Plan'.tr,
              style: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            SizedBox(height: 1.5.h),
            TextField(
              controller: controller.titleController,
              decoration: InputDecoration(
                labelText: 'Title'.tr,
                border: const OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 1.5.h),
            TextField(
              controller: controller.descriptionController,
              maxLines: 4,
              decoration: InputDecoration(
                labelText: 'Description'.tr,
                border: const OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 2.h),
            SizedBox(
              width: double.infinity,
              child: Obx(() => ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(vertical: 1.5.h),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: controller.isSubmitting.value
                        ? null
                        : controller.submitPlan,
                    icon: controller.isSubmitting.value
                        ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Icon(Icons.add_circle_outline),
                    label: Text(
                      controller.isSubmitting.value
                          ? 'Saving...'.tr
                          : 'Save Plan'.tr,
                      style: TextStyle(fontSize: 14.sp),
                    ),
                  )),
            ),
          ],
        ),
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
