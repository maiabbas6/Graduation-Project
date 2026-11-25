import 'package:get/get.dart';
import 'chat_list_controller.dart';

class ChatListBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<ChatListController>(ChatListController());
  }
}
