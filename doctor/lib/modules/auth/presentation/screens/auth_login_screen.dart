import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:doctor/core/core_components/theme/app_theme.dart';
import 'package:doctor/core/utils/app_validator.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_text_form_field.dart';
import '../../../../core/data_state/data_state.dart';
import '../controllers/auth_login/auth_login_binding.dart';
import '../controllers/auth_login/auth_login_controller.dart';


class AuthLoginScreen extends GetView<AuthLoginController> {
  const AuthLoginScreen({super.key});

  static const name = '/auth/login';

  static final page = GetPage(
    name: name,
    page: () => const AuthLoginScreen(),
    binding: AuthLoginBinding(),
  );

  static void navigate() => Get.toNamed(name);

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      body: SingleChildScrollView(
        padding: EdgeInsets.all(5.vmin),
        child: Form(
          key: controller.formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                width: double.infinity,
                height: 95.vmin,
                decoration: BoxDecoration(
                  color: context.theme.primaryColor.withAlpha(120),
                  borderRadius: AppTheme.defaultBorderRadius,
                  image: DecorationImage(image: NetworkImage(
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl4mX22SThCYKOb2Yb9O7BF1hEaWmMY1X8L2dTsTdNJ4KNwn-FXCWOGw8&s=10',
                  ),
                  fit: BoxFit.cover
                  )
                ),
              ),
              SizedBox(height: 10.vmin),
              Text(
                'Welcome Back'.tr,
                style: TextStyle(
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              SizedBox(height: 1.vmin),
              Text(
                'Sign in to your account'.tr,
                style: TextStyle(
                  fontSize: 15.sp,
                  color: AppColors.textSecondary,
                ),
              ),
              SizedBox(height: 6.vmin),
              AppTextFormField(
                controller: controller.phoneController,
                hint: 'Phone'.tr,
                keyboardType: TextInputType.phone,
                validator: AppValidator.validatePhoneNumber
              ),
              SizedBox(height: 2.vmin),
              AppTextFormField(
                  controller: controller.passwordController,
                  hint: 'Password'.tr,
                  isPass: true,
                  validator: (v) =>
                      (v == null || v.isEmpty) ? 'Password is required'.tr : null,
                ),
              SizedBox(height: 4.vmin),
              AppButton(
                title: 'Login'.tr,
                isLoading: controller.dataState.status.isLoading,
                onTap: controller.sendData,
              ),
              SizedBox(height: 2.vmin),
              
            ],
          ),
        ),
      ),
    );
  }
}
