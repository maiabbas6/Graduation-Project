import 'package:get/get.dart';
import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/appointment_data_source.dart';
import '../../../data/models/appointment_model.dart';

class AppointmentListController extends LoadDataController<List<AppointmentModel>> {
  final after = Rxn<DateTime>();
  final before = Rxn<DateTime>();
  final appointmentStatus = Rxn<AppointmentStatus>();
  final type = Rxn<AppointmentType>();

  Map<String, dynamic> get queryParams {
    return {
      if (after.value != null) 'after': after.value!.toIso8601String(),
      if (before.value != null) 'before': before.value!.toIso8601String(),
      if (appointmentStatus.value != null)
        'status': appointmentStatus.value!.name.toLowerCase(),
      if (type.value != null) 'type': type.value!.toString(),
    };
  }

  @override
  Future<List<AppointmentModel>> callApi() {
    return AppointmentDataSource.getAppointments(queryParams);
  }

  void applyFilters() => loadData();

  void resetFilters() {
    after.value = null;
    before.value = null;
    appointmentStatus.value = null;
    type.value = null;
    loadData();
  }
}
