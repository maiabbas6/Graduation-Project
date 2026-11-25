import 'package:get/get.dart';

import '../../../data/models/appointment_model.dart';
import 'appointment_info_controller.dart';

class AppointmentInfoBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<AppointmentInfoController>(
      AppointmentInfoController(Get.arguments as AppointmentModel),
    );
  }
}
