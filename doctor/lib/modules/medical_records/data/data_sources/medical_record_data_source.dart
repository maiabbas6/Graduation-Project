import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/medical_record_detail_model.dart';

class MedicalRecordDataSource {
  static Future<MedicalRecordDetailModel> getMedicalRecord(int id) async {
    var response = await NetworkHelper().get(ApiConst.medicalRecordById(id));
    return MedicalRecordDetailModel.fromJson(response.data['data']);
  }

  static Future<void> addMedicalPlan({
    required int medicalRecordId,
    required String title,
    required String description,
  }) async {
    await NetworkHelper().post(
      ApiConst.medicalPlans,
      body: {
        'medical_record_id': medicalRecordId,
        'title': title,
        'description': description,
      },
    );
  }
}
