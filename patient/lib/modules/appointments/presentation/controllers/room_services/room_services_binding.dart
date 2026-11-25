import 'package:get/get.dart';

import '../../../data/models/appointment_model.dart';
import 'room_services_controller.dart';

class RoomServicesBinding implements Bindings {
  @override
  void dependencies() {
    Get.put<RoomServicesController>(
      RoomServicesController(appointment: Get.arguments as AppointmentModel),
    );
  }
}
