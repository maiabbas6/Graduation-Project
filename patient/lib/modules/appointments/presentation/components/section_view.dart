import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:patient/core/core_components/theme/app_theme.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../data/models/section_model.dart';

class SectionView extends StatelessWidget {
  final SectionModel section;
  final VoidCallback? onTap;
  final bool isActive;

  const SectionView({
    super.key,
    required this.section,
    this.onTap,
    this.isActive = false
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color:isActive ? AppColors.primary: AppColors.background,
          borderRadius: BorderRadius.circular(2.vmin),
          border: Border.all(color: AppColors.primary)
        ),
        
        padding: EdgeInsets.all(2.vmin),
        margin: EdgeInsets.all(2.vmin),
        child: Column(
          children: [
            const Spacer(
              flex: 2,
            ),
            SvgPicture.network(
              section.icon,
              width: 12.5.vmin,
              colorFilter: ColorFilter.mode(isActive ? AppColors.background: AppColors.primary, BlendMode.srcIn),  
            ),
            const Spacer(),
            Text(
              section.name,
              textAlign: TextAlign.center,
              style: TextStyle(
                color:isActive ? AppColors.background: AppColors.primary,
                fontSize: 15.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
            const Spacer(
              flex: 2,
            ),
          ],
        ),
      ),
    );
  }
}
