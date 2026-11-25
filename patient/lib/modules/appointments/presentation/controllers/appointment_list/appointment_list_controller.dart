import 'package:get/get.dart';
import 'package:patient/core/data_state/data_state.dart';

import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../../../core/core_components/pop_up.dart';
import '../../../../../core/errors/handler.dart';
import '../../../data/data_sources/appointment_data_source.dart';
import '../../../data/models/appointment_model.dart';

class AppointmentListController extends LoadDataController<List<AppointmentModel>> {
  @override
  Future<List<AppointmentModel>> callApi() {
    return AppointmentDataSource.getAppointments();
  }

  Future<void> deleteAppointment(int id) async {
    showLoader();
    final result = await handle(() => AppointmentDataSource.deleteAppointment(id));
    Get.back();
    if (result.status.isSuccess) {
      await loadData();
      showSnackBar('Appointment deleted successfully'.tr);
    } else {
      showSnackBar(result.exception.toString());
    }
  }
}
