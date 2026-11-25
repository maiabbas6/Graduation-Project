import 'package:flutter/material.dart';

import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_network_image.dart';
import '../../../../core/utils/string_utils.dart';
import '../../data/models/chat_model.dart';

class ChatCard extends StatelessWidget {
  final ChatModel chat;
  final VoidCallback? onTap;

  const ChatCard({
    super.key,
    required this.chat,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.vmin, vertical: 1.vmin),
        padding: EdgeInsets.all(3.vmin),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(2.vmin),
          boxShadow: [
            BoxShadow(
              color: AppColors.shadowColor,
              blurRadius: 2.vmin,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          children: [
            chat.imageUrl != null && chat.imageUrl!.isNotEmpty
                ? AppNetworkImage(
                    chat.imageUrl!,
                    shape: BoxShape.circle,
                    width: 12.vmin,
                    height: 12.vmin,
                  )
                : CircleAvatar(
                    radius: 6.vmin,
                    backgroundColor: AppColors.secondary,
                    child: Icon(
                      Icons.chat_bubble_outline,
                      color: AppColors.primary,
                      size: 6.vmin,
                    ),
                  ),
            SizedBox(width: 3.vmin),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    chat.title.trim().isNotEmpty ? chat.title.trim() : 'Chat',
                    style: TextStyle(
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 0.5.vmin),
                  Text(
                    chat.createdAt.formattedDateTime,
                    style: TextStyle(
                      fontSize: 13.sp,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right,
              color: AppColors.textSecondary,
              size: 7.5.vmin,
            ),
          ],
        ),
      ),
    );
  }
}
