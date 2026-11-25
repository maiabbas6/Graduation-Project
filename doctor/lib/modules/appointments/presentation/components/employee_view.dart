import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/employee_model.dart';

class EmployeeView extends StatelessWidget {
  final EmployeeModel employee;

  const EmployeeView({
    super.key,
    required this.employee,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.vmin, vertical: 1.vmin),
      padding: EdgeInsets.all(3.vmin),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(2.vmin),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowColor,
            blurRadius: 2.vmin,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 5.vmin,
            backgroundColor: AppColors.primary,
            child: Text(
              employee.initials,
              style: TextStyle(
                color: AppColors.buttonColorFont,
                fontWeight: FontWeight.bold,
                fontSize: 14.sp,
              ),
            ),
          ),
          SizedBox(width: 3.vmin),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  employee.user?.fullName ?? '',
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                SizedBox(height: 0.5.vmin),
                Text(
                  employee.specialization ,
                  style: TextStyle(
                    fontSize: 15.sp,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 2.vmin, vertical: 1.vmin),
            decoration: BoxDecoration(
              color: (employee.isActive)
                  ? Colors.green.withValues(alpha: 0.1)
                  : AppColors.shadowColor,
              borderRadius: BorderRadius.circular(1.vmin),
            ),
            child: Text(
              (employee.isActive ) ? 'Active'.tr : 'Inactive'.tr,
              style: TextStyle(
                fontSize: 11.sp,
                color: (employee.isActive )
                    ? Colors.green
                    : AppColors.textSecondary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
