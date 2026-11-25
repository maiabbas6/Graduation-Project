

class ApiConst {
  static const _base = 'https://temp.alanoudtours.cloud/api';

  static String get _domain => _base.split('/api').first;

  static String resolveUrl(String path) {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return '$_domain${path.startsWith('/') ? '' : '/'}$path';
  }

  static const login = '$_base/auth/login';
  static const register = '$_base/auth/register';

  static const sections = '$_base/sections';

  static String sectionById(int id) => '$sections/$id/employees';

  static const appointments = '$_base/appointments';

  static String appointmentById(int id) => '$_base/appointments/$id';
  static const profile = '$_base/auth/profile';
  static const notifications = '$_base/notifications';

  static const aiChat = '$_base/ai_chat';
  static const newChat = '$_base/new-chat';

  static String chatById(int id) => '$_base/ai_chat/$id';
  static String messageChat(int id) => '$_base/message-chat/$id';
  static String employeeById(int id) => '$_base/employees/$id';

  static String employeeSchedualsTimesById(int id,DateTime date) => '$_base/employees/$id/available-slots?date=${date.toIso8601String()}';

  static const myCosts = '$_base/my-costs';
  static const myCostsSummary = '$_base/my-costs/summary';
  static const appointmentsNext = '$_base/appointments-next';

  static String medicalRecordById(int id) => '$_base/medical-records/$id';

  static const roomServices = '$_base/room-services';
  static const roomServiceUsers = '$_base/room-service-users';
}