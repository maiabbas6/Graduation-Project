import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/core_components/app_loader.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../../../core/constants/color_const.dart';
import '../components/message_bubble.dart';
import '../controllers/chat_screen/chat_screen_binding.dart';
import '../controllers/chat_screen/chat_screen_controller.dart';
import '../../data/models/chat_model.dart';

class ChatScreen extends GetView<ChatScreenController> {
  const ChatScreen({super.key});

  static const _name = '/chat/screen';

  static final page = GetPage(
    name: _name,
    page: () => const ChatScreen(),
    binding: ChatScreenBinding(),
  );

  static void navigate([ChatModel? chat]) {
    Get.toNamed(_name, arguments: chat);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text(
          controller.chat?.title ?? 'New Chat',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ControllerComponent<ChatModel, ChatScreenController>(
              onSuccess: (_, _) => Obx(
                () => ListView.builder(
                  padding: EdgeInsets.all(4.vmin),
                  itemCount: controller.messages.length,
                  itemBuilder: (_, i) =>
                      MessageBubble(message: controller.messages[i]),
                ),
              ),
              onLoading: (_) => const Center(child: AppLoader()),
            ),
          ),
          _buildInputBar(),
        ],
      ),
    );
  }

  Widget _buildInputBar() {
    return Container(
      padding: EdgeInsets.all(3.vmin),
      decoration: BoxDecoration(
        color: AppColors.surface,
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowColor,
            blurRadius: 2.vmin,
            offset: const Offset(0, -1),
          ),
        ],
      ),
      child: Column(
        children: [
          Obx(() => controller.selectedImage.value != null
              ? _buildImagePreview()
              : const SizedBox.shrink()),
          Row(
            children: [
              Expanded(
                child: Obx(
                  () => TextField(
                    controller: controller.messageController,
                    enabled: !(controller.messages.lastOrNull?.isSending ?? false),
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      hintStyle: TextStyle(
                        fontSize: 14.sp,
                        color: AppColors.textSecondary,
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(2.vmin),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: AppColors.background,
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 3.vmin,
                        vertical: 2.vmin,
                      ),
                    ),
                    style: TextStyle(fontSize: 14.sp),
                    textInputAction: TextInputAction.send,
                    onSubmitted: (_) => controller.sendMessage(),
                  ),
                ),
              ),
              SizedBox(width: 2.vmin),
              Obx(()=>Visibility(
                visible: !(controller.messages.lastOrNull?.isSending ?? false),
                replacement: AppLoader(),
                child: Row(
                  children: [
                    IconButton(
                      icon: Icon(
                        Icons.image_rounded,
                        color: AppColors.primary,
                        size: 5.vmin,
                      ),
                      tooltip: 'Send image'.tr,
                      onPressed: controller.pickImage,
                    ),
                    IconButton(
                      icon: Icon(
                        Icons.send_rounded,
                        color: AppColors.primary,
                        size: 5.vmin,
                      ),
                      onPressed: controller.sendMessage,
                    ),
                  ],
                ),
              ),),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildImagePreview() {
    return Container(
      margin: EdgeInsets.only(bottom: 1.5.vmin),
      child: Stack(
        alignment: Alignment.topRight,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(2.vmin),
            child: Image.file(
              File(controller.selectedImage.value!),
              width: 20.vmin,
              height: 20.vmin,
              fit: BoxFit.cover,
            ),
          ),
          GestureDetector(
            onTap: controller.removeImage,
            child: Container(
              margin: EdgeInsets.all(0.5.vmin),
              padding: EdgeInsets.all(1.vmin),
              decoration: const BoxDecoration(
                color: Colors.black54,
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.close,
                size: 3.vmin,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
