import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:patient/core/core_components/theme/app_theme.dart';
import 'package:patient/core/utils/app_validator.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_text_form_field.dart';
import '../../../../core/data_state/data_state.dart';
import '../controllers/auth_login/auth_login_binding.dart';
import '../controllers/auth_login/auth_login_controller.dart';
import 'auth_register_screen.dart';

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
                  image: DecorationImage(
                    image: NetworkImage('https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg'),
                      fit: BoxFit.cover
                    )
                ),
              ),
              SizedBox(height: 10.vmin),
              Text(
                'Welcome Back',
                style: TextStyle(
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              SizedBox(height: 1.vmin),
              Text(
                'Sign in to your account',
                style: TextStyle(
                  fontSize: 15.sp,
                  color: AppColors.textSecondary,
                ),
              ),
              SizedBox(height: 6.vmin),
              AppTextFormField(
                controller: controller.phoneController,
                hint: 'Phone',
                keyboardType: TextInputType.phone,
                validator: AppValidator.validatePhoneNumber
              ),
              SizedBox(height: 2.vmin),
              AppTextFormField(
                  controller: controller.passwordController,
                  hint: 'Password',
                  isPass: true,
                  validator: (v) =>
                      (v == null || v.isEmpty) ? 'Password is required' : null,
                ),
              SizedBox(height: 4.vmin),
              AppButton(
                title: 'Login',
                isLoading: controller.dataState.status.isLoading,
                onTap: controller.sendData,
              ),
              SizedBox(height: 2.vmin),
              TextButton(
                onPressed: () => Get.toNamed(AuthRegisterScreen.name),
                child: Text(
                  "Don't have an account? Register",
                  style: TextStyle(
                    color: AppColors.primary,
                    fontSize: 14.sp,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
