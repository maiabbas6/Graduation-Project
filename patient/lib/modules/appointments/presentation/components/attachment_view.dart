import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../../core/constants/api_const.dart';
import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_network_image.dart';
import '../../data/models/attachment_model.dart';

class AttachmentView extends StatelessWidget {
  final AttachmentModel attachment;
  final bool showLabel;

  const AttachmentView({
    super.key,
    required this.attachment,
    this.showLabel = true,
  });

  static const _imagePattern =
      r'\.(jpe?g|png|gif|webp|bmp|heic|heif)(\?.*)?$';

  bool get _isImage =>
      RegExp(_imagePattern, caseSensitive: false).hasMatch(attachment.path);

  String get _url => ApiConst.resolveUrl(attachment.path);

  @override
  Widget build(BuildContext context) {
    if (_isImage) {
      return GestureDetector(
        onTap: () => _launch(),
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.6.h),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: AppColors.shadowColor,
                blurRadius: 5,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: AppNetworkImage(
              _url,
              height: 30.h,
              fit: BoxFit.cover,
            ),
          ),
        ),
      );
    }

    return _FileTile(url: _url, path: attachment.path);
  }

  Future<void> _launch() async {
    final uri = Uri.parse(_url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }
}

class _FileTile extends StatelessWidget {
  final String url;
  final String path;

  const _FileTile({required this.url, required this.path});

  @override
  Widget build(BuildContext context) {
    final name = path.split('/').last;
    return InkWell(
      onTap: () async {
        final uri = Uri.parse(url);
        if (await canLaunchUrl(uri)) {
          await launchUrl(uri, mode: LaunchMode.externalApplication);
        }
      },
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.6.h),
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: AppColors.shadowColor,
              blurRadius: 5,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                Icons.attach_file,
                color: AppColors.primary,
                size: 5.vmin,
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: TextStyle(
                      fontSize: 13.sp,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  SizedBox(height: 0.3.h),
                  Text(
                    'Tap to open'.tr,
                    style: TextStyle(
                      fontSize: 11.sp,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.open_in_new,
              color: AppColors.textSecondary,
              size: 4.vmin,
            ),
          ],
        ),
      ),
    );
  }
}
