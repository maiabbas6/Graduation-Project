import 'package:get/get.dart';

import '../../../data/data_sources/notification_data_source.dart';
import '../../../data/models/notification_model.dart';

class NotificationListController extends GetxController {
  final notifications = <NotificationModel>[].obs;
  final isLoading = true.obs;

  int get unreadCount => notifications.where((n) => !n.isRead).length;

  @override
  void onReady() {
    super.onReady();
    loadNotifications();
  }

  Future<void> loadNotifications() async {
    isLoading.value = true;
    try {
      final data = await NotificationDataSource.getNotifications();
      notifications.value = data;
    } catch (e) {
      Get.snackbar('Error'.tr, 'Failed to load notifications'.tr);
    } finally {
      isLoading.value = false;
    }
  }

  void markAsRead(int id) {
    final index = notifications.indexWhere((n) => n.id == id);
    if (index != -1) {
      final old = notifications[index];
      notifications[index] = NotificationModel(
        id: old.id,
        title: old.title,
        body: old.body,
        isRead: true,
        createdAt: old.createdAt,
      );
      notifications.refresh();
    }
  }

  void markAllAsRead() {
    notifications.value = notifications.map((n) => NotificationModel(
      id: n.id,
      title: n.title,
      body: n.body,
      isRead: true,
      createdAt: n.createdAt,
    )).toList();
  }
}
