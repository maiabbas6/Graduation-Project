import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';

class HealthStatusComponent extends StatelessWidget {
  const HealthStatusComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.vmin, vertical: 1.vmin),
      child: Container(
        padding: EdgeInsets.all(4.vmin),
        decoration: BoxDecoration(
          color: AppColors.secondary,
          borderRadius: BorderRadius.circular(2.vmin),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  Icons.favorite,
                  color: AppColors.primary,
                  size: 5.vmin,
                ),
                SizedBox(width: 2.vmin),
                Text(
                  'Health Status',
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.vmin),
            _buildInfoChip(
              Icons.check_circle,
              'Good',
              AppColors.success,
            ),
            SizedBox(height: 1.5.vmin),
            _buildDetailRow(Icons.history, 'Last checkup', '15 Jul 2026'),
            SizedBox(height: 1.vmin),
            _buildDetailRow(Icons.schedule, 'Next checkup', '15 Aug 2026'),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoChip(IconData icon, String label, Color color) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 2.vmin, vertical: 1.vmin),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(1.5.vmin),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 4.vmin, color: color),
          SizedBox(width: 1.vmin),
          Text(
            label,
            style: TextStyle(
              fontSize: 13.sp,
              color: color,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailRow(IconData icon, String label, String value) {
    return Row(
      children: [
        Icon(icon, size: 4.vmin, color: AppColors.textSecondary),
        SizedBox(width: 2.vmin),
        Text(
          '$label: ',
          style: TextStyle(
            fontSize: 12.sp,
            color: AppColors.textSecondary,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: 12.sp,
            fontWeight: FontWeight.w600,
            color: AppColors.textPrimary,
          ),
        ),
      ],
    );
  }
}
