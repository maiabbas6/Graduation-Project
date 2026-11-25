import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../constants/color_const.dart';
import '../../modules/chat/presentation/screens/chat_list_screen.dart';
import '../../modules/profile/presentation/screens/profile_screen.dart';
import '../../modules/appointments/presentation/screens/home_screen.dart';
import '../../modules/appointments/presentation/screens/appointment_list_screen.dart';

class AppBottomNavBar extends StatelessWidget {
  final int currentIndex;

  const AppBottomNavBar({
    super.key,
    required this.currentIndex,
  });

  static const _navItems = [
    {'icon': Icons.home_outlined, 'activeIcon': Icons.home, 'label': 'Home', 'route': HomeScreen.route},
    {'icon': Icons.calendar_today_outlined, 'activeIcon': Icons.calendar_today, 'label': 'Appoint.', 'route': AppointmentListScreen.route},
    {'icon': Icons.chat_bubble_outline, 'activeIcon': Icons.chat_bubble, 'label': 'Chat', 'route': ChatListScreen.name},
    {'icon': Icons.person_outline, 'activeIcon': Icons.person, 'label': 'Profile', 'route': ProfileScreen.name},
  ];

  void _onTap(int index) {
    if (index == currentIndex) return;

    final route = _navItems[index]['route'] as String;
    if (route.startsWith('/')) {
      Get.offAllNamed(route);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppColors.surface.withOpacity(0.8),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: AppColors.surface.withOpacity(0.5)),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowColor,
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: List.generate(_navItems.length, (index) {
          final item = _navItems[index];
          final isSelected = index == currentIndex;
          return GestureDetector(
            onTap: () => _onTap(index),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  isSelected ? item['activeIcon'] as IconData : item['icon'] as IconData,
                  color: isSelected ? AppColors.primary : AppColors.textSecondary,
                  size: 22.sp,
                ),
                Text(
                  item['label'] as String,
                  style: TextStyle(
                    color: isSelected ? AppColors.primary : AppColors.textSecondary,
                    fontSize: 10.sp,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  ),
                ),
              ],
            ),
          );
        }),
      ),
    );
  }
}
