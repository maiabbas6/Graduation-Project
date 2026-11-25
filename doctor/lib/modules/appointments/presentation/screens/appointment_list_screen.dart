import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_bottom_nav_bar.dart';
import '../../../../core/core_components/theme/app_theme.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../data/models/appointment_model.dart';
import '../controllers/appointment_list/appointment_list_controller.dart';
import '../controllers/appointment_list/appointment_list_binding.dart';
import '../components/appointment_card.dart';
import 'appointment_info_screen.dart';
import '../../../notifications/presentation/screens/notification_list_screen.dart';

class AppointmentListScreen extends GetView<AppointmentListController> {
  static const route = '/appointments';

  static GetPage page = GetPage(
    name: route,
    page: () => const AppointmentListScreen(),
    binding: AppointmentListBinding(),
  );

  const AppointmentListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(
              'Appointments'.tr,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
            ),
            floating: true,
            snap: true,
            elevation: 0,
            backgroundColor: Theme.of(context).scaffoldBackgroundColor,
            foregroundColor: Theme.of(context).primaryColor,
            actions: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined),
                onPressed: () => NotificationListScreen.navigate(),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: _WelcomeBanner(),
          ),
          GetBuilder<AppointmentListController>(
            builder: (controller) => SliverToBoxAdapter(
              child: _AppointmentFilters(controller: controller),
            ),
          ),
          SliverToBoxAdapter(
            child: SizedBox(height: 2.vmin),
          ),
          GetBuilder<AppointmentListController>(
            builder: (controller) => StatusComponent.sliver(
              state: controller.dataState,
              onSuccess: (context, data) {
                if (data.isEmpty) {
                  return SliverFillRemaining(
                    child: Center(child: Text('No appointments found'.tr)),
                  );
                }
                return SliverList(
                  delegate: SliverChildBuilderDelegate((context, index) {
                    final appointment = data[index];
                    return AppointmentCard(
                      appointment: appointment,
                      onTap: () => AppointmentInfoScreen.navigate(appointment),
                    );
                  }, childCount: data.length),
                );
              },
            ),
          ),
          SliverToBoxAdapter(
            child: SizedBox(
              height: 20.vmin,
            ),
          )
        ],
      ),
      bottomNavigationBar: const AppBottomNavBar(currentIndex: 0),
    );
  }
}

class _WelcomeBanner extends StatelessWidget {
  const _WelcomeBanner();

  Future<void> _pickFilterDate(BuildContext context, AppointmentListController controller) async {
    final now = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: controller.after.value ?? now,
      firstDate: DateTime(now.year - 2),
      lastDate: DateTime(now.year + 3),
    );
    if (picked == null) return;
    controller.after.value = picked;
    controller.applyFilters();
  }

  @override
  Widget build(BuildContext context) {
    final userName =
        Get.isRegistered<String>(tag: 'user-name') ? Get.find<String>(tag: 'user-name') : '';
    final todayStr = DateFormat('EEEE, MMMM d').format(DateTime.now());
    final controller = Get.find<AppointmentListController>();

    return GetBuilder<AppointmentListController>(
      builder: (_) {
        final selectedDate = controller.after.value;
        final subtitleText = selectedDate == null
            ? 'Today: $todayStr (Tap to filter date)'
            : 'Filtered date: ${DateFormat('MMM dd, yyyy').format(selectedDate)} (Tap to change)';

        return GestureDetector(
          onTap: () => _pickFilterDate(context, controller),
          child: Container(
            margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
            decoration: BoxDecoration(
              color: AppColors.primary,
              borderRadius: AppTheme.defaultBorderRadius,
              boxShadow: AppTheme.defaultShadow,
            ),
            child: ListTile(
              contentPadding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
              title: Text(
                'Welcome back${userName.isEmpty ? '' : ', $userName'}',
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: AppColors.surface,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(
                subtitleText,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: AppColors.surface.withOpacity(0.9),
                  fontSize: 13.sp,
                ),
              ),
              trailing: CircleAvatar(
                radius: 16.sp,
                backgroundColor: AppColors.surface.withOpacity(0.2),
                child: Icon(
                  Icons.calendar_today_outlined,
                  color: AppColors.surface,
                  size: 18.sp,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class _AppointmentFilters extends StatelessWidget {
  final AppointmentListController controller;

  const _AppointmentFilters({required this.controller});

  static const _statuses = [
    null, // All
    AppointmentStatus.waiting,
    AppointmentStatus.canceled,
    AppointmentStatus.suspended,
    AppointmentStatus.closed,
  ];

  String _statusLabel(AppointmentStatus? status) {
    if (status == null) return 'All'.tr;
    return status.name[0].toUpperCase() + status.name.substring(1);
  }

  void _showTypeOptions() {
    showModalBottomSheet(
      context: Get.context!,
      builder: (_) => SafeArea(
        child: ListView(
          shrinkWrap: true,
          children: [
            ListTile(
              title: Text('All Types'.tr),
              onTap: () {
                Get.back();
                controller.type.value = null;
                controller.applyFilters();
              },
            ),
            for (final type in AppointmentType.values)
              ListTile(
                title: Text(_typeLabel(type)),
                onTap: () {
                  Get.back();
                  controller.type.value = type;
                  controller.applyFilters();
                },
              ),
          ],
        ),
      ),
    );
  }

  String _typeLabel(AppointmentType type) {
    switch (type) {
      case AppointmentType.consultation:
        return 'Consultation'.tr;
      case AppointmentType.followUp:
        return 'Follow-up'.tr;
      case AppointmentType.routineCheck:
        return 'Routine Check'.tr;
      case AppointmentType.urgent:
        return 'Urgent'.tr;
      case AppointmentType.surgery:
        return 'Surgery'.tr;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.5.h),
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppTheme.defaultBorderRadius,
        border: Border.all(color: AppColors.primary.withOpacity(0.15)),
        boxShadow: AppTheme.lightShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 1.w, vertical: 0.5.h),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Status Filter Tabs'.tr,
                  style: TextStyle(
                    fontSize: 15.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                if (controller.appointmentStatus.value != null ||
                    controller.type.value != null ||
                    controller.after.value != null ||
                    controller.before.value != null)
                  TextButton(
                    onPressed: controller.resetFilters,
                    child: Text('Reset'.tr, style: TextStyle(fontSize: 13.sp)),
                  ),
              ],
            ),
          ),
          SizedBox(height: 0.5.h),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _statuses.map((status) {
                final isSelected = controller.appointmentStatus.value == status;
                return Padding(
                  padding: EdgeInsets.only(right: 2.w),
                  child: ChoiceChip(
                    label: Text(_statusLabel(status)),
                    selected: isSelected,
                    selectedColor: AppColors.primary,
                    labelStyle: TextStyle(
                      color: isSelected ? AppColors.surface : AppColors.textPrimary,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      fontSize: 13.sp,
                    ),
                    onSelected: (_) {
                      controller.appointmentStatus.value = status;
                      controller.applyFilters();
                    },
                  ),
                );
              }).toList(),
            ),
          ),
          SizedBox(height: 1.h),
          _FilterRow(
            icon: Icons.category_outlined,
            label: 'Type Filter'.tr,
            value: controller.type.value == null
                ? 'All Types'.tr
                : _typeLabel(controller.type.value!),
            onTap: _showTypeOptions,
          ),
        ],
      ),
    );
  }
}

class _FilterRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final VoidCallback onTap;

  const _FilterRow({
    required this.icon,
    required this.label,
    required this.value,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      dense: true,
      contentPadding: EdgeInsets.symmetric(horizontal: 1.w),
      leading: Icon(icon, color: AppColors.primary),
      title: Text(
        label,
        style: TextStyle(fontSize: 14.sp, color: AppColors.textSecondary),
      ),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w500,
              color: AppColors.textPrimary,
            ),
          ),
          Icon(Icons.chevron_right, color: AppColors.textSecondary),
        ],
      ),
      onTap: onTap,
    );
  }
}
