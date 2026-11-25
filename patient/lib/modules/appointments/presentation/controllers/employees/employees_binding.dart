import 'package:get/get.dart';
import 'employees_controller.dart';

class EmployeesBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<EmployeesController>(EmployeesController(Get.arguments));
  }
}
