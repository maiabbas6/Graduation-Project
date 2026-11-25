import 'package:get/get.dart';
import 'employee_details_controller.dart';

class EmployeeDetailsBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<EmployeeDetailsController>(EmployeeDetailsController(Get.arguments));
  }
}
