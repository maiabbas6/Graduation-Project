import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_loader.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/state_management/state_component.dart';
import '../controllers/auth_splash/auth_splash_binding.dart';
import '../controllers/auth_splash/auth_splash_controller.dart';

class AuthSplashScreen extends GetView<AuthSplashController> {
  static const name = '/';

  static final page = GetPage(
    name: name,
    page: () => const AuthSplashScreen(),
    binding: AuthSplashBinding(),
  );

  const AuthSplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: ControllerComponent<String, AuthSplashController>(
        onLoading: (_) => _buildLoading(),
        onError: (context, message) => _buildError(message),
        onSuccess: (context, _) => const SizedBox.shrink(),
      ),
    );
  }

  Widget _buildLoading() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Med-System\nEmployees'.tr,
            style: TextStyle(
              fontSize: 28.sp,
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 4.h),
          const AppLoader(),
        ],
      ),
    );
  }

  Widget _buildError(String message) {
    return Padding(
      padding: EdgeInsets.all(8.w),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 40.sp,
              color: AppColors.error,
            ),
            SizedBox(height: 2.h),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 15.sp,
                color: AppColors.textPrimary,
              ),
            ),
            SizedBox(height: 3.h),
            AppButton(
              title: 'Try Again'.tr,
              onTap: controller.loadData,
            ),
          ],
        ),
      ),
    );
  }
}
