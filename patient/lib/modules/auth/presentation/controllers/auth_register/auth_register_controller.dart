import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:patient/modules/appointments/presentation/screens/home_screen.dart';

import '../../../../../core/base_controllers/send_data_controller.dart';
import '../../../../../core/core_components/pop_up.dart';
import '../../../data/data_sources/auth_data_source.dart';

class AuthRegisterController extends SendDataController<String> {
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  final addressController = TextEditingController();
  final birth = Rxn<DateTime>();
  final isPasswordHidden = true.obs;
  final isConfirmPasswordHidden = true.obs;

  String get birthFormatted =>
      birth.value != null ? DateFormat('yyyy-MM-dd').format(birth.value!) : '';

  void pickDate(BuildContext context) async {
    var picked = await showDatePicker(
      context: context,
      initialDate: birth.value ?? DateTime(2008),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      birth.value = picked;
      update();
    }
  }

  @override
  Future<String> callApi() => AuthDataSource.register(
        firstName: firstNameController.text.trim(),
        lastName: lastNameController.text.trim(),
        phone: phoneController.text.trim(),
        password: passwordController.text,
        birth: birthFormatted,
        address: addressController.text.trim(),
      );

  @override
  void onSuccess(String data) {
    Get.put(data,tag: 'user-name',permanent: true);
    Get.offAllNamed(HomeScreen.route);
  }

  @override
  void onFail(Object exception) {
    showSnackBar(exception.toString());
  }

  String? validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) return 'Confirm password is required';
    if (value != passwordController.text) return 'Passwords do not match';
    return null;
  }

  @override
  void onClose() {
    firstNameController.dispose();
    lastNameController.dispose();
    phoneController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    addressController.dispose();
    super.onClose();
  }
}
