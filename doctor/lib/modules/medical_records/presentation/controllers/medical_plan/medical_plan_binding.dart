import 'package:get/get.dart';

import 'medical_plan_controller.dart';

class MedicalPlanBinding implements Bindings {
  @override
  void dependencies() {
    Get.put(MedicalPlanController(Get.arguments as int));
  }
}
