import 'package:get/get.dart';

import '../../modules/auth/presentation/screens/auth_login_screen.dart';
import '../../modules/auth/presentation/screens/auth_splash_screen.dart';
import '../../modules/chat/presentation/screens/chat_list_screen.dart';
import '../../modules/chat/presentation/screens/chat_screen.dart';
import '../../modules/profile/presentation/screens/profile_screen.dart';
import '../../modules/appointments/presentation/screens/employees_screen.dart';
import '../../modules/appointments/presentation/screens/select_section_screen.dart';
import '../../modules/appointments/presentation/screens/appointment_info_screen.dart';
import '../../modules/appointments/presentation/screens/appointment_list_screen.dart';
import '../../modules/appointments/presentation/screens/manage_appointment_screen.dart';
import '../../modules/appointments/presentation/screens/employee_details_screen.dart';
import '../../modules/patient/presentation/screens/patient_info_screen.dart';
import '../../modules/medical_records/presentation/screens/medical_record_info_screen.dart';
import '../../modules/medical_records/presentation/screens/medical_plan_screen.dart';
import '../../modules/notifications/presentation/screens/notification_list_screen.dart';

class AppPages {
  static final List<GetPage> pages = [
AuthSplashScreen.page,
    AuthLoginScreen.page,
    EmployeesScreen.page,
    SelectSectionScreen.page,
    EmployeeDetailsScreen.page,
    AppointmentInfoScreen.page,
    ManageAppointmentScreen.page,
    PatientInfoScreen.page,
    MedicalRecordInfoScreen.page,
    MedicalPlanScreen.page,
    NotificationListScreen.page,
    ChatListScreen.page,
    ChatScreen.page,
    ProfileScreen.page,
    AppointmentListScreen.page,
  ];
}
