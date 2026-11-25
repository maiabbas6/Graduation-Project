import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/medical_record_model.dart';

class ProfileMedicalRecordCard extends StatelessWidget {
  final MedicalRecordModel record;

  const ProfileMedicalRecordCard({super.key, required this.record});

  Color _getTypeColor() {
    switch (record.type) {
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

  IconData _getTypeIcon() {
    switch (record.type) {
      case 'lab':
        return Icons.science_outlined;
      case 'radiology':
        return Icons.gradient_sharp;
      case 'treatment':
        return Icons.healing;
      case 'consultation':
        return Icons.chat_outlined;
      case 'diagnosis':
        return Icons.assignment;
      case 'follow-up':
        return Icons.replay;
      case 'routine-check':
        return Icons.fact_check_outlined;
      case 'urgent':
        return Icons.warning_amber_outlined;
      default:
        return Icons.medical_services_outlined;
    }
  }

  String _getTypeLabel() {
    switch (record.type) {
      case 'lab':
        return 'Lab'.tr;
      case 'radiology':
        return 'Radiology'.tr;
      case 'treatment':
        return 'Treatment'.tr;
      case 'consultation':
        return 'Consultation'.tr;
      case 'diagnosis':
        return 'Diagnosis'.tr;
      case 'follow-up':
        return 'Follow-up'.tr;
      case 'routine-check':
        return 'Routine Check'.tr;
      case 'urgent':
        return 'Urgent'.tr;
      default:
        return record.type.capitalizeFirst ?? record.type;
    }
  }

  @override
  Widget build(BuildContext context) {
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
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: _getTypeColor().withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              _getTypeIcon(),
              color: _getTypeColor(),
              size: 16.sp,
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 2.w,
                        vertical: 0.3.h,
                      ),
                      decoration: BoxDecoration(
                        color: _getTypeColor().withOpacity(0.1),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        _getTypeLabel(),
                        style: TextStyle(
                          fontSize: 11.sp,
                          color: _getTypeColor(),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    Text(
                      DateFormat('MMM dd, yyyy').format(record.date),
                      style: TextStyle(
                        fontSize: 11.sp,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 0.8.h),
                Text(
                  record.description,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
