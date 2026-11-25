import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/appointment_model.dart';

class AppointmentDataSource {
  static Future<AppointmentModel> getAppointment(int id) async {
    var response = await NetworkHelper().get(ApiConst.appointmentById(id));
    return AppointmentModel.fromJson(response.data['data']);
  }

  static Future<List<AppointmentModel>> getAppointments(
      [Map<String, dynamic>? filters]) async {
    var response = await NetworkHelper().get(ApiConst.appointments(filters));
    List rawList = response.data['data'];
    return rawList.map((json) => AppointmentModel.fromJson(json)).toList();
  }

  static Future<void> closeAppointment({
    required int appointmentId,
    required String medicalRecordType,
    required String medicalRecordDescription,
  }) async {
    await NetworkHelper().post(
      ApiConst.closeAppointment,
      body: {
        'appointment_id': appointmentId,
        'medical_record': {
          'type': medicalRecordType,
          'description': medicalRecordDescription,
        },
      },
    );
  }

  
}
