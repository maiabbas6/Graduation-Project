import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';

class ServicesComponent extends StatelessWidget {
  const ServicesComponent({super.key});

  static const _services = [
    (
      label: 'Book Appointment',
      icon: Icons.medical_services_outlined,
      route: '/select-section',
    ),
    (
      label: 'My Appointments',
      icon: Icons.event_note,
      route: '/appointments',
    ),
    (
      label: 'Doctors',
      icon: Icons.people_outline,
      route: null,
    ),
    (
      label: 'Medical Records',
      icon: Icons.folder_outlined,
      route: null,
    ),
    (
      label: 'Chat',
      icon: Icons.chat_bubble_outline,
      route: '/chat',
    ),
    (
      label: 'Profile',
      icon: Icons.person_outline,
      route: '/profile',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.vmin, vertical: 1.vmin),
      child: Container(
        padding: EdgeInsets.all(4.vmin),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(2.vmin),
          boxShadow: [
            BoxShadow(
              color: AppColors.shadowColor,
              blurRadius: 2.vmin,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  Icons.grid_view,
                  color: AppColors.primary,
                  size: 5.vmin,
                ),
                SizedBox(width: 2.vmin),
                Text(
                  'Services',
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.vmin),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 2.vmin,
                crossAxisSpacing: 2.vmin,
                childAspectRatio: 1.6,
              ),
              itemCount: _services.length,
              itemBuilder: (_, index) {
                final service = _services[index];
                return _ServiceTile(service: service);
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _ServiceTile extends StatelessWidget {
  const _ServiceTile({required this.service});

  final ({String label, IconData icon, String? route}) service;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(1.5.vmin),
      onTap: service.route == null
          ? () {}
          : () => Get.toNamed(service.route!),
      child: Container(
        padding: EdgeInsets.all(2.vmin),
        decoration: BoxDecoration(
          color: AppColors.secondary.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(1.5.vmin),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            Icon(service.icon, size: 5.vmin, color: AppColors.primary),
            SizedBox(width: 2.vmin),
            Expanded(
              child: Text(
                service.label,
                style: TextStyle(
                  fontSize: 12.5.sp,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
