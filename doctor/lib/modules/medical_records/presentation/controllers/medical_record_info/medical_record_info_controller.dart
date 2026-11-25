import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/medical_record_data_source.dart';
import '../../../data/models/medical_record_detail_model.dart';

class MedicalRecordInfoController
    extends LoadDataController<MedicalRecordDetailModel> {
  final int medicalRecordId;

  MedicalRecordInfoController(this.medicalRecordId);

  @override
  Future<MedicalRecordDetailModel> callApi() =>
      MedicalRecordDataSource.getMedicalRecord(medicalRecordId);
}
