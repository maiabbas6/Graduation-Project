import 'package:get/get.dart';

import '../../modules/auth/presentation/screens/auth_login_screen.dart';
import '../../modules/auth/presentation/screens/auth_register_screen.dart';
import '../../modules/auth/presentation/screens/auth_splash_screen.dart';
import '../../modules/chat/presentation/screens/chat_list_screen.dart';
import '../../modules/chat/presentation/screens/chat_screen.dart';
import '../../modules/profile/presentation/screens/profile_screen.dart';
import '../../modules/appointments/presentation/screens/employees_screen.dart';
import '../../modules/appointments/presentation/screens/select_section_screen.dart';
import '../../modules/appointments/presentation/screens/appointment_info_screen.dart';
import '../../modules/appointments/presentation/screens/room_services_screen.dart';
import '../../modules/appointments/presentation/screens/home_screen.dart';
import '../../modules/appointments/presentation/screens/appointment_list_screen.dart';
import '../../modules/appointments/presentation/screens/create_appointment_screen.dart';
import '../../modules/appointments/presentation/screens/employee_details_screen.dart';
import '../../modules/notifications/presentation/screens/notification_list_screen.dart';
import '../../modules/profile/presentation/screens/medical_record_info_screen.dart';

class AppPages {
  static final List<GetPage> pages = [
    AuthSplashScreen.page,
    AuthLoginScreen.page,
    AuthRegisterScreen.page,
    HomeScreen.page,
    EmployeesScreen.page,
    SelectSectionScreen.page,
    EmployeeDetailsScreen.page,
    AppointmentInfoScreen.page,
    RoomServicesScreen.page,
    ChatListScreen.page,
    ChatScreen.page,
    ProfileScreen.page,
    AppointmentListScreen.page,
    CreateAppointmentScreen.page,
    NotificationListScreen.page,
    MedicalRecordInfoScreen.page,
  ];
}
