import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_info_tile.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/medical_record_info_model.dart';
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

  static void navigate(int id) {
    Get.toNamed(_name, arguments: id);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(title: const Text('Medical Record')),
      body: CustomScrollView(
        slivers: [
          ControllerComponent.sliver<MedicalRecordInfoModel,
              MedicalRecordInfoController>(
            onSuccess: (_, record) => SliverList(
              delegate: SliverChildListDelegate([
                _buildHeader(record),
                SizedBox(height: 2.h),
                if (record.user != null) ...[
                  _buildSectionTitle('Patient'),
                  SizedBox(height: 0.5.h),
                  AppInfoTile(
                    icon: Icons.person_outline,
                    label: 'Name',
                    value: record.user!.fullName,
                  ),
                  AppInfoTile(
                    icon: Icons.phone_outlined,
                    label: 'Phone',
                    value: record.user!.phone,
                  ),
                  AppInfoTile(
                    icon: Icons.location_on_outlined,
                    label: 'Address',
                    value: record.user!.address,
                  ),
                  AppInfoTile(
                    icon: Icons.wc,
                    label: 'Gender',
                    value: _capitalize(record.user!.gender),
                  ),
                ],
                if (record.employee != null) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Doctor'),
                  SizedBox(height: 0.5.h),
                  AppInfoTile(
                    icon: Icons.person_outline,
                    label: 'Name',
                    value: record.employee!.user?.fullName ?? '',
                  ),
                  AppInfoTile(
                    icon: Icons.medical_services_outlined,
                    label: 'Specialization',
                    value: record.employee!.specialization,
                  ),
                  AppInfoTile(
                    icon: Icons.badge_outlined,
                    label: 'License No.',
                    value: record.employee!.licenseNo,
                  ),
                  if (record.employee!.user != null) ...[
                    AppInfoTile(
                      icon: Icons.phone_outlined,
                      label: 'Phone',
                      value: record.employee!.user!.phone,
                    ),
                    AppInfoTile(
                      icon: Icons.location_on_outlined,
                      label: 'Address',
                      value: record.employee!.user!.address,
                    ),
                  ],
                ],
                SizedBox(height: 2.h),
                _buildSectionTitle('Record Details'),
                SizedBox(height: 0.5.h),
                AppInfoTile(
                  icon: Icons.category_outlined,
                  label: 'Type',
                  value: _getTypeLabel(record.type),
                ),
                AppInfoTile(
                  icon: Icons.calendar_today,
                  label: 'Date',
                  value: DateFormat('MMM dd, yyyy').format(record.date),
                ),
                SizedBox(height: 2.h),
                _buildSectionTitle('Description'),
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
                if (record.medicalPlans.isNotEmpty) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Medical Plans'),
                  SizedBox(height: 0.5.h),
                  ...record.medicalPlans.map(
                    (plan) => _buildPlanCard(plan),
                  ),
                ],
                if (record.attachments.isNotEmpty) ...[
                  SizedBox(height: 2.h),
                  _buildSectionTitle('Attachments'),
                  SizedBox(height: 0.5.h),
                  ...record.attachments.map(
                    (attachment) => AppInfoTile(
                      icon: Icons.attach_file,
                      label: 'File',
                      value: attachment.path,
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

  Widget _buildHeader(MedicalRecordInfoModel record) {
    final color = _getTypeColor(record.type);
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 4.h, horizontal: 4.w),
      decoration: BoxDecoration(
        color: color,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(24),
          bottomRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          Text(
            _getTypeLabel(record.type),
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
                DateFormat('MMM dd, yyyy').format(record.date),
                style: TextStyle(fontSize: 14.sp, color: AppColors.textLight),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPlanCard(MedicalPlanModel plan) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.6.h),
      padding: EdgeInsets.all(3.w),
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
          Text(
            plan.title,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            plan.description,
            style: TextStyle(
              fontSize: 13.sp,
              color: AppColors.textPrimary,
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

  String _getTypeLabel(String type) {
    switch (type) {
      case 'lab':
        return 'Lab';
      case 'radiology':
        return 'Radiology';
      case 'treatment':
        return 'Treatment';
      case 'consultation':
        return 'Consultation';
      case 'diagnosis':
        return 'Diagnosis';
      case 'follow-up':
        return 'Follow-up';
      case 'routine-check':
        return 'Routine Check';
      case 'urgent':
        return 'Urgent';
      default:
        return type.capitalizeFirst ?? type;
    }
  }

  Color _getTypeColor(String type) {
    switch (type) {
      case 'lab':
        return Colors.purple;
      case 'radiology':
        return Colors.indigo;
      case 'treatment':
        return Colors.teal;
      case 'consultation':
        return AppColors.primary;
      case 'diagnosis':
        return Colors.orange;
      case 'follow-up':
        return Colors.blue;
      case 'routine-check':
        return AppColors.success;
      case 'urgent':
        return AppColors.error;
      default:
        return AppColors.textSecondary;
    }
  }

  String _capitalize(String? value) {
    if (value == null || value.isEmpty) return '';
    return value[0].toUpperCase() + value.substring(1);
  }
}
