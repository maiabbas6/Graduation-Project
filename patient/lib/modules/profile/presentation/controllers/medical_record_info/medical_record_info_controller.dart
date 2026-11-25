import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/profile_data_source.dart';
import '../../../data/models/medical_record_info_model.dart';

class MedicalRecordInfoController
    extends LoadDataController<MedicalRecordInfoModel> {
  final int id;

  MedicalRecordInfoController(this.id);

  @override
  Future<MedicalRecordInfoModel> callApi() =>
      ProfileDataSource.getMedicalRecord(id);
}
