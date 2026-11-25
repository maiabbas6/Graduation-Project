import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../controllers/notification_list/notification_list_binding.dart';
import '../controllers/notification_list/notification_list_controller.dart';
import '../../data/models/notification_model.dart';

class NotificationListScreen extends GetView<NotificationListController> {
  static const _name = '/notifications';

  static final page = GetPage(
    name: _name,
    page: () => const NotificationListScreen(),
    binding: NotificationListBinding(),
  );

  const NotificationListScreen({super.key});

  static void navigate() => Get.toNamed(_name);

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text('Notifications'.tr),
        actions: [
          Obx(() => controller.unreadCount > 0
              ? TextButton(
                  onPressed: controller.markAllAsRead,
                  child: Text(
                    'Mark all read'.tr,
                    style: TextStyle(
                      color: AppColors.surface,
                      fontSize: 13.sp,
                    ),
                  ),
                )
              : const SizedBox.shrink()),
        ],
      ),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }
        if (controller.notifications.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.notifications_none, size: 64.sp, color: Colors.grey),
                SizedBox(height: 2.h),
                Text(
                  'No notifications'.tr,
                  style: TextStyle(fontSize: 16.sp, color: Colors.grey),
                ),
              ],
            ),
          );
        }
        return RefreshIndicator(
          onRefresh: controller.loadNotifications,
          child: ListView.separated(
            padding: EdgeInsets.symmetric(vertical: 1.h),
            itemCount: controller.notifications.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final notification = controller.notifications[index];
              return _NotificationTile(
                notification: notification,
                onTap: () => controller.markAsRead(notification.id),
              );
            },
          ),
        );
      }),
    );
  }
}

class _NotificationTile extends StatelessWidget {
  final NotificationModel notification;
  final VoidCallback onTap;

  const _NotificationTile({required this.notification, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      leading: CircleAvatar(
        radius: 5.w,
        backgroundColor: notification.isRead
            ? Colors.grey.withOpacity(0.2)
            : AppColors.primary.withOpacity(0.15),
        child: Icon(
          Icons.notifications_outlined,
          size: 20.sp,
          color: notification.isRead ? Colors.grey : AppColors.primary,
        ),
      ),
      title: Text(
        notification.title,
        style: TextStyle(
          fontSize: 14.sp,
          fontWeight: notification.isRead ? FontWeight.normal : FontWeight.bold,
          color: AppColors.textPrimary,
        ),
      ),
      subtitle: Padding(
        padding: EdgeInsets.only(top: 0.5.h),
        child: Text(
          notification.body,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            fontSize: 12.sp,
            color: AppColors.textSecondary,
          ),
        ),
      ),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (!notification.isRead)
            Container(
              width: 8.sp,
              height: 8.sp,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
            ),
          SizedBox(height: 0.5.h),
          Text(
            _formatDate(notification.createdAt),
            style: TextStyle(fontSize: 10.sp, color: Colors.grey),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final diff = now.difference(date);
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    if (diff.inDays < 7) return '${diff.inDays}d ago';
    return '${date.month}/${date.day}';
  }
}
