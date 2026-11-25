import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/appointment_model.dart';

class AppointmentDataSource {
  static Future<AppointmentModel> getAppointment(int id) async {
    var response = await NetworkHelper().get(ApiConst.appointmentById(id));
    return AppointmentModel.fromJson(response.data['data']);
  }

  static Future<List<AppointmentModel>> getAppointments() async {
    var response = await NetworkHelper().get(ApiConst.appointments);
    List rawList = response.data['data'];
    return rawList.map((json) => AppointmentModel.fromJson(json)).toList();
  }

  static Future<dynamic> deleteAppointment(int id) async {
    return await NetworkHelper().delete(ApiConst.appointmentById(id));
  }

  static Future<dynamic> createAppointment({
    required int employeeId,
    required DateTime appointmentDateTime,
    required String description,
    required AppointmentType type,
    required List<String> attatchments
  }) async {
    return await NetworkHelper().post(
      ApiConst.appointments,
      body: {
        'employee_id': employeeId,
        'appointment_date_time': appointmentDateTime.toIso8601String(),
        'description': description,
        'type': type.toString(),
      },
      files: attatchments.asMap().map((k,v)=>MapEntry('attatchments[$k]', v))
    );
  }
}
