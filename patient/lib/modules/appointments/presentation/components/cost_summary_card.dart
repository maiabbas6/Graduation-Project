import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/cost_summary_model.dart';

class CostSummaryCard extends StatelessWidget {
  final CostSummaryModel summary;

  const CostSummaryCard({super.key, required this.summary});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: AppColors.primary,
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
            Row(
              children: [
                Icon(
                  Icons.account_balance_wallet_outlined,
                  color: AppColors.textLight,
                  size: 5.vmin,
                ),
                SizedBox(width: 2.w),
                Text(
                  'My Costs',
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textLight,
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                _buildSummaryItem(
                  label: 'Paid',
                  amount: summary.totalPaid,
                  color: AppColors.success,
                ),
                SizedBox(width: 3.w),
                _buildSummaryItem(
                  label: 'Unpaid',
                  amount: summary.totalUnpaid,
                  color: AppColors.warning,
                ),
                SizedBox(width: 3.w),
                _buildSummaryItem(
                  label: 'Total',
                  amount: summary.total,
                  color: AppColors.textLight,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryItem({
    required String label,
    required double amount,
    required Color color,
  }) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 12.sp,
              color: color.withValues(alpha: 0.8),
            ),
          ),
          SizedBox(height: 0.3.h),
          Text(
            _formatAmount(amount),
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  String _formatAmount(double amount) {
    if (amount == amount.roundToDouble()) {
      return '\$${amount.toStringAsFixed(0)}';
    }
    return '\$${amount.toStringAsFixed(2)}';
  }
}
