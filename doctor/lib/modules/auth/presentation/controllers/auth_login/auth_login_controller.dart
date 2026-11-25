import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:doctor/modules/appointments/presentation/screens/appointment_list_screen.dart';

import '../../../../../core/base_controllers/send_data_controller.dart';
import '../../../../../core/core_components/pop_up.dart';
import '../../../data/data_sources/auth_data_source.dart';

class AuthLoginController extends SendDataController<String> {
  
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();
  

  @override
  Future<String> callApi() => AuthDataSource.login(
        phone: phoneController.text.trim(),
        password: passwordController.text,
  );

  @override
  void onSuccess(String data) {
    Get.put(data,tag: 'user-name',permanent: true);
    Get.offAllNamed(AppointmentListScreen.route);
  }

  @override
  void onFail(Object exception) {
    showSnackBar(exception.toString());
  }

  @override
  void onClose() {
    phoneController.dispose();
    passwordController.dispose();
    super.onClose();
  }
}
