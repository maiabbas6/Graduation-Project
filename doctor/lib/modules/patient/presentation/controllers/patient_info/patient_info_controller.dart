import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/patient_data_source.dart';
import '../../../data/models/patient_model.dart';

class PatientInfoController extends LoadDataController<PatientModel> {
  final int userId;

  PatientInfoController(this.userId);

  @override
  Future<PatientModel> callApi() => PatientDataSource.fetchPatient(userId);
}
