import "../../../../../core/core_components/pop_up.dart";
import "../../../../../core/errors/exeptions.dart";
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../../../core/errors/handler.dart';
import '../../../../../core/utils/file_picker_helper.dart';
import '../../../data/data_sources/chat_data_source.dart';
import '../../../data/models/chat_model.dart';
import '../../../data/models/message_model.dart';
import '../chat_list/chat_list_controller.dart';

class ChatScreenController extends LoadDataController<ChatModel> {
  ChatModel? chat;
  final messageController = TextEditingController();
  final messages = <MessageModel>[].obs;
  final selectedImage = Rx<String?>(null);

  static const _maxImageSize = 1024 * 1024;

  ChatScreenController({this.chat});

  @override
  Future<ChatModel> callApi() async {
    if (chat == null) {
      return ChatModel(
        id: 0,
        userId: 0,
        title: '',
        createdAt: DateTime.now(),
        messages: [],
      );
    }
    return ChatDataSource.getChat(chat!.id);
  }

  @override
  void onSuccess(ChatModel data) {
    if (data.messages != null) {
      messages.assignAll(data.messages!);
    }
  }

  Future<void> pickImage() async {
    final path = await FilePickerHelper.pickFile(type: FileType.image);
    if (path == null) return;

    final file = File(path);
    if (await file.length() > _maxImageSize) {
      showSnackBar('Image must be 1 MB or less'.tr);
      return;
    }

    selectedImage.value = path;
  }

  void removeImage() => selectedImage.value = null;

  Future<void> sendMessage() async {
    final text = messageController.text.trim();
    final image = selectedImage.value;
    if (text.isEmpty && image == null) return;

    final tempMessage = MessageModel(
      id: -1,
      chatId: chat?.id ?? 0,
      question: text,
      answer: '',
      createdAt: DateTime.now().toIso8601String(),
      image: image,
    );
    messages.add(tempMessage);
    messageController.clear();
    selectedImage.value = null;

    if (chat == null) {
      final result = await handle(() => ChatDataSource.newChat(text, image: image));

      result.fold(
        (exception) {
          messages.removeLast();
          if (exception is BaseException) {
            showSnackBar(exception.message);
          } else {
            showSnackBar(exception.toString());
          }
        },
        (data) {
          chat = data;
          try {
            Get.find<ChatListController>().loadData();
          } catch (e) {
            // Handle if ChatListController is not found
          }

          if (data.messages != null && data.messages!.isNotEmpty) {
            messages.last = data.messages!.last;
          }
        },
      );
    } else {
      final result = await handle(
          () => ChatDataSource.sendMessage(chat!.id, text, image: image));

      result.fold(
        (exception) {
          messages.removeLast();
          if (exception is BaseException) {
            showSnackBar(exception.message);
          } else {
            showSnackBar(exception.toString());
          }
        },
        (data) {
          messages.last = data;
        },
      );
    }

    update();
  }

  @override
  void onClose() {
    messageController.dispose();
    super.onClose();
  }
}
