import 'package:get/get.dart';

import '../../../data/models/appointment_model.dart';
import 'manage_appointment_controller.dart';

class ManageAppointmentBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<ManageAppointmentController>(
      ManageAppointmentController(Get.arguments as AppointmentModel),
    );
  }
}
