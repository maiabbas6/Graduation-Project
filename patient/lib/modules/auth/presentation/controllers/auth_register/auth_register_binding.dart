import 'package:get/get.dart';
import 'auth_register_controller.dart';

class AuthRegisterBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<AuthRegisterController>(AuthRegisterController());
  }
}
