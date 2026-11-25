import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/patient_model.dart';

class PatientDataSource {
  static Future<PatientModel> fetchPatient(int id) async {
    var response = await NetworkHelper().get(ApiConst.userById(id));
    return PatientModel.fromJson(response.data['data']);
  }
}
