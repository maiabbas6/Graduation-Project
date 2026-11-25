import 'package:get/get.dart';

import 'auth_splash_controller.dart';

class AuthSplashBinding implements Bindings {
  @override
  void dependencies() {
    Get.put(AuthSplashController());
  }
}
