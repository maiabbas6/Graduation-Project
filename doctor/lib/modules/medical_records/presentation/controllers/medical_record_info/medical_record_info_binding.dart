import 'package:get/get.dart';

import 'medical_record_info_controller.dart';

class MedicalRecordInfoBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<MedicalRecordInfoController>(
      MedicalRecordInfoController(Get.arguments as int),
    );
  }
}
