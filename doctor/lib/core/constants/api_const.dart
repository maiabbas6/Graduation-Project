

class ApiConst {
  static const _base = 'https://temp.alanoudtours.cloud/api';

  static const login = '$_base/auth/login';

  static const sections = '$_base/sections';

  static String sectionById(int id) => '$sections/$id/employees';

  static String appointments([Map<String,dynamic>? prams]) => '$_base/appointments${prams?.toPrams ?? ''}';

  static String appointmentById(int id) => '$_base/appointments/$id';
  static const profile = '$_base/auth/profile';

  static const aiChat = '$_base/ai_chat';
  static const newChat = '$_base/new-chat';

  static String chatById(int id) => '$_base/ai_chat/$id';
  static String messageChat(int id) => '$_base/message-chat/$id';
  static String employeeById(int id) => '$_base/employees/$id';
  static String userById(int id) => '$_base/user/$id';

  static String employeeSchedualsTimesById(int id,DateTime date) => '$_base/employees/$id/available-slots?date=${date.toIso8601String()}';

  static const closeAppointment = '$_base/appointments-close';

  static String medicalRecordById(int id) => '$_base/medical-records/$id';

  static const medicalPlans = '$_base/medical-plans';

  static const notifications = '$_base/notifications';
}

extension _toPram on Map<String,dynamic> {

  String get toPrams {
    if(isEmpty) return '';

    return '?${entries.map((e) => '${e.key}=${e.value}').join("&")}';
  }

}