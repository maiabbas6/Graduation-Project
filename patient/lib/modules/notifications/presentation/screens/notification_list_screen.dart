import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../controllers/notification_list/notification_list_binding.dart';
import '../controllers/notification_list/notification_list_controller.dart';
import '../components/notification_card.dart';

class NotificationListScreen extends GetView<NotificationListController> {
  const NotificationListScreen({super.key});

  static const route = '/notifications';

  static final page = GetPage(
    name: route,
    page: () => const NotificationListScreen(),
    binding: NotificationListBinding(),
  );

  static void navigate() => Get.toNamed(route);

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(
              'Notifications',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
            ),
            floating: true,
            snap: true,
            elevation: 0,
            backgroundColor: Theme.of(context).scaffoldBackgroundColor,
            foregroundColor: Theme.of(context).primaryColor,
          ),
          GetBuilder<NotificationListController>(
            builder: (controller) => StatusComponent.sliver(
              state: controller.dataState,
              onSuccess: (context, data) {
                if (data.isEmpty) {
                  return SliverFillRemaining(
                    child: Center(
                      child: Text(
                        'No notifications found'.tr,
                        style: TextStyle(fontSize: 15.sp),
                      ),
                    ),
                  );
                }
                return SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      return NotificationCard(notification: data[index]);
                    },
                    childCount: data.length,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
