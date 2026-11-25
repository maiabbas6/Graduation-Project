import 'dart:io';

import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_network_image.dart';
import '../../data/models/message_model.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';

class MessageBubble extends StatelessWidget {
  final MessageModel message;

  const MessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        _buildQuestionBubble(),
        _buildImage(),
        SizedBox(height: 1.vmin),
        _buildAnswerBubble(context),

        SizedBox(height: 2.vmin),
      ],
    );
  }

  Widget _buildImage() {
    final image = message.image;
    if (image == null || image.isEmpty) return const SizedBox.shrink();

    final isNetwork = image.startsWith('http');
    final Widget content = isNetwork
        ? AppNetworkImage(
            image,
            fit: BoxFit.cover,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(2.vmin),
              topRight: Radius.circular(2.vmin),
              bottomLeft: Radius.circular(2.vmin),
            ),
          )
        : ClipRRect(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(2.vmin),
              topRight: Radius.circular(2.vmin),
              bottomLeft: Radius.circular(2.vmin),
            ),
            child: Image.file(
              File(image),
              fit: BoxFit.cover,
            ),
          );

    return Align(
      alignment: Alignment.centerRight,
      child: Container(
        margin: EdgeInsets.only(bottom: 1.vmin),
        constraints: BoxConstraints(maxWidth: 60.vmin, maxHeight: 40.vmin),
        child: content,
      ),
    );
  }

  Widget _buildQuestionBubble() {
    return Align(
      alignment: Alignment.centerRight,
      child: Container(
        constraints: BoxConstraints(maxWidth: 75.vmin),
        padding: EdgeInsets.all(3.vmin),
        decoration: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(2.vmin),
            topRight: Radius.circular(2.vmin),
            bottomLeft: Radius.circular(2.vmin),
          ),
        ),
        child: Column(
          children: [
            Text(
              message.question,
              style: TextStyle(fontSize: 14.sp, color: AppColors.buttonColorFont),
            ),

          ],
        ),
      ),
    );
  }

  Widget _buildAnswerBubble(context) {
    return Visibility(
      visible: !message.isSending,
      replacement: Align(
        alignment: Alignment.centerLeft,
        child: Container(
          height: 10.vmin,
          constraints: BoxConstraints(maxWidth: 80.vmin),
          padding: EdgeInsets.all(3.vmin),
          decoration: BoxDecoration(
            color: AppColors.secondary,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(2.vmin),
              topRight: Radius.circular(2.vmin),
              bottomRight: Radius.circular(2.vmin),
            ),
          ),
        ),
      ),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Container(
          constraints: BoxConstraints(maxWidth: 80.vmin),
          padding: EdgeInsets.all(3.vmin),
          child: MarkdownBody(
            data: message.answer,
            styleSheet: _buildMedicalStyleSheet(context),
          ),
        ),
      ),
    );
  }

  MarkdownStyleSheet _buildMedicalStyleSheet(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return MarkdownStyleSheet.fromTheme(theme).copyWith(
      // عناوين رئيسية (لأسماء الأمراض أو المواضيع)
      h1: TextStyle(
        fontSize: 22.sp,
        fontWeight: FontWeight.bold,
        color: colorScheme.primary,
        height: 1.3,
      ),
      h2: TextStyle(
        fontSize: 18.sp,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurface,
      
        height: 1.3,
      ),
      h3: TextStyle(
        fontSize: 17.sp,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurfaceVariant,
        height: 1.4,
      ),

      // النص الطبي الأساسي (مريح للقراءة)
      p: TextStyle(fontSize: 16.sp, height: 1.8, color: colorScheme.onSurface),

      // التأكيد على الكلمات المهمة (الأعراض، التحذيرات)
      strong: TextStyle(
        fontWeight: FontWeight.bold,
        color: colorScheme.primary, // بلون مميز
      ),
      em: TextStyle(
        fontStyle: FontStyle.italic,
        color: colorScheme.onSurfaceVariant,
      ),

      // القوائم النقطية (للأعراض أو خطوات العلاج)
      listBullet: TextStyle(fontSize: 16.sp, color: colorScheme.primary),

      // الاقتباسات (مخصصة للتنويهات الطبية والتحذيرات)
      blockquote: TextStyle(
        fontSize: 15.sp,
        fontStyle: FontStyle.italic,
        color: colorScheme.onSurfaceVariant,
        height: 1.5,
      ),
      blockquoteDecoration: BoxDecoration(
        color: colorScheme.primary.withOpacity(0.05),
        border: Border(
          left: BorderSide(color: colorScheme.primary, width: 0.6.vmin),
        ),
        borderRadius: BorderRadius.only(
          topRight: Radius.circular(1.5.vmin),
          bottomRight: Radius.circular(1.5.vmin),
        ),
      ),
    );
  }
}
