import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/core_components/app_bottom_nav_bar.dart';
import '../../../../core/core_components/app_loader.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/empty_view.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../../../../core/data_state/data_state.dart';
import '../../data/models/chat_model.dart';
import '../components/chat_card.dart';
import '../controllers/chat_list/chat_list_binding.dart';
import '../controllers/chat_list/chat_list_controller.dart';
import 'chat_screen.dart';

class ChatListScreen extends GetView<ChatListController> {
  const ChatListScreen({super.key});

  static const name = '/chat';

  static final page = GetPage(
    name: name,
    page: () => const ChatListScreen(),
    binding: ChatListBinding(),
  );

  static void navigate() => Get.toNamed(name);

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: CustomScrollView(
        controller: controller.scrollController,
        slivers: [
          SliverAppBar(
            title: Text(
              'Chats',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18.sp),
            ),
            floating: true,
            snap: true,
            actions: [
              IconButton(
                icon: Icon(Icons.add, size: 5.vmin),
                onPressed: () => ChatScreen.navigate(),
              ),
            ],
          ),
          ControllerComponent.sliver<List<ChatModel>, ChatListController>(
            onSuccess: (_, chats) => EmptyView.sliver(
              onNotEmpty: (_) => SliverList.builder(
                itemCount: chats.length ,
                itemBuilder: (_, i) {
                  
                  return ChatCard(
                    chat: chats[i],
                    onTap: () => ChatScreen.navigate(chats[i]),
                  );
                },
              ),
              isEmpty: chats.isEmpty,
            ),
            onLoading: (_) => const SliverToBoxAdapter(
              child: Center(child: AppLoader()),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNavBar(currentIndex: 2),
    );
  }
}
