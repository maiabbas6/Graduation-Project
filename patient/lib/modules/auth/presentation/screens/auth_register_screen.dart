import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/constants/color_const.dart';
import '../../../../core/core_components/app_button.dart';
import '../../../../core/core_components/app_scaffold.dart';
import '../../../../core/core_components/app_text_form_field.dart';
import '../../../../core/data_state/data_state.dart';
import '../controllers/auth_register/auth_register_binding.dart';
import '../controllers/auth_register/auth_register_controller.dart';

class AuthRegisterScreen extends GetView<AuthRegisterController> {
  const AuthRegisterScreen({super.key});

  static const name = '/auth/register';

  static final page = GetPage(
    name: name,
    page: () => const AuthRegisterScreen(),
    binding: AuthRegisterBinding(),
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
              SizedBox(height: 8.vmin),
              Text(
                'Create Account',
                style: TextStyle(
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              SizedBox(height: 1.vmin),
              Text(
                'Sign up to get started',
                style: TextStyle(
                  fontSize: 15.sp,
                  color: AppColors.textSecondary,
                ),
              ),
              SizedBox(height: 5.vmin),
              AppTextFormField(
                controller: controller.firstNameController,
                hint: 'First Name',
                validator: (v) =>
                    (v == null || v.isEmpty) ? 'First name is required' : null,
              ),
              SizedBox(height: 2.vmin),
              AppTextFormField(
                controller: controller.lastNameController,
                hint: 'Last Name',
                validator: (v) =>
                    (v == null || v.isEmpty) ? 'Last name is required' : null,
              ),
              SizedBox(height: 2.vmin),
              AppTextFormField(
                controller: controller.phoneController,
                hint: 'Phone',
                keyboardType: TextInputType.phone,
                validator: (v) =>
                    (v == null || v.isEmpty) ? 'Phone is required' : null,
              ),
              SizedBox(height: 2.vmin),
              Obx(
                () => AppTextFormField(
                  controller: controller.passwordController,
                  hint: 'Password',
                  isPass: !controller.isPasswordHidden.value,
                  suffix: GestureDetector(
                    onTap: () => controller.isPasswordHidden.toggle(),
                    child: Icon(
                      controller.isPasswordHidden.value
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  validator: (v) =>
                      (v == null || v.isEmpty) ? 'Password is required' : null,
                ),
              ),
              SizedBox(height: 2.vmin),
              Obx(
                () => AppTextFormField(
                  controller: controller.confirmPasswordController,
                  hint: 'Confirm Password',
                  isPass: !controller.isConfirmPasswordHidden.value,
                  suffix: GestureDetector(
                    onTap: () => controller.isConfirmPasswordHidden.toggle(),
                    child: Icon(
                      controller.isConfirmPasswordHidden.value
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  validator: controller.validateConfirmPassword,
                ),
              ),
              SizedBox(height: 2.vmin),
              GestureDetector(
                onTap: () => controller.pickDate(context),
                child: Obx(
                  () => AbsorbPointer(
                    child: AppTextFormField(
                      hint: 'Birth Date',
                      controller:
                          TextEditingController(text: controller.birthFormatted),
                      suffix: const Icon(
                        Icons.calendar_today,
                      ),
                      validator: (_) =>
                          controller.birth.value == null
                              ? 'Birth date is required'
                              : null,
                    ),
                  ),
                ),
              ),
              SizedBox(height: 2.vmin),
              AppTextFormField(
                controller: controller.addressController,
                hint: 'Address',
                validator: (v) =>
                    (v == null || v.isEmpty) ? 'Address is required' : null,
              ),
              SizedBox(height: 4.vmin),
              AppButton(
                title: 'Register',
                isLoading: controller.dataState.status.isLoading,
                onTap: controller.sendData,
              ),
              SizedBox(height: 2.vmin),
              TextButton(
                onPressed: () => Get.back(),
                child: Text(
                  'Already have an account? Login',
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
