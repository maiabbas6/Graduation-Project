import 'package:get/get.dart';

import 'notification_list_controller.dart';

class NotificationListBinding implements Bindings {
  @override
  void dependencies() {
    Get.put(NotificationListController());
  }
}
