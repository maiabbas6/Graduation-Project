import 'package:get/get.dart';
import '../../../data/models/chat_model.dart';
import 'chat_screen_controller.dart';

class ChatScreenBinding implements Bindings {
  @override
  void dependencies() {
    final argument = Get.arguments;
    ChatModel? chat;
    if (argument is ChatModel) {
      chat = argument;
    } else if (argument is int) {
      chat = ChatModel(id: argument, userId: 0, title: '', createdAt: DateTime.now());
    }
    
    Get.put<ChatScreenController>(
      ChatScreenController(chat: chat),
    );
  }
}
