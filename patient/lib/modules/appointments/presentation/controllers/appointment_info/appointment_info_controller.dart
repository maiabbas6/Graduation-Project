import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/appointment_data_source.dart';
import '../../../data/models/appointment_model.dart';

class AppointmentInfoController extends LoadDataController<AppointmentModel> {
  final AppointmentModel appointment;

  AppointmentInfoController(this.appointment);

  @override
  Future<AppointmentModel> callApi() =>
      AppointmentDataSource.getAppointment(appointment.id);
}
