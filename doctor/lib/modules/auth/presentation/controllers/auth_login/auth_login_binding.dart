import 'package:get/get.dart';
import 'auth_login_controller.dart';

class AuthLoginBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<AuthLoginController>(AuthLoginController());
  }
}
