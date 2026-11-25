import 'package:get/get.dart';
import 'package:patient/core/data_state/data_state.dart';

import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../../../core/core_components/pop_up.dart';
import '../../../../../core/errors/exeptions.dart';
import '../../../../../core/errors/handler.dart';
import '../../../data/data_sources/room_service_data_source.dart';
import '../../../data/models/appointment_model.dart';
import '../../../data/models/room_service_model.dart';

class RoomServicesController extends LoadDataController<List<RoomServiceModel>> {
  final AppointmentModel appointment;
  final selectedService = Rx<RoomServiceModel?>(null);

  RoomServicesController({required this.appointment});

  @override
  Future<List<RoomServiceModel>> callApi() =>
      RoomServiceDataSource.getRoomServices();
  
  

  Future<void> submit() async {
    final service = selectedService.value;
    if (service == null) {
      showSnackBar('Please select a service'.tr);
      return;
    }

    final roomId = appointment.room?.id ?? appointment.roomId;
    if (roomId == null) {
      showSnackBar('Room not found'.tr);
      return;
    }

    showLoader();
    final result = await handle(
      () => RoomServiceDataSource.createRoomServiceUser(
        roomServiceId: service.id,
        roomId: roomId,
        employeeId: appointment.employeeId,
      ),
    );
    Get.back();

    if (result.status.isSuccess) {
      showSnackBar('Room service booked successfully'.tr);
      Get.back();
    } else {
      showSnackBar(
        result.exception is BaseException
            ? (result.exception as BaseException).message
            : result.exception.toString(),
      );
    }
  }
}
