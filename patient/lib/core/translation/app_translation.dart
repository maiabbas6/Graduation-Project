import 'package:get/get.dart';

class AppTranslation extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'en_us': _englishKeys,
        'ar_sy': _arabicKeys,
      };

  static const _englishKeys = {
    // App
    'Doctor': 'Doctor',

    // Auth
    'Med-System\nEmployees': 'Med-System\nEmployees',
    'Try Again': 'Try Again',
    'Welcome Back': 'Welcome Back',
    'Sign in to your account': 'Sign in to your account',
    'Phone': 'Phone',
    'Password': 'Password',
    'Password is required': 'Password is required',
    'Login': 'Login',
    'Phone Number is required': 'Phone Number is required',
    'Phone Number is not valid': 'Phone Number is not valid',
    'must be a valid number': 'must be a valid number',
    'invalid birth day': 'invalid birth day',
    'birth day is required': 'birth day is required',
    'required': 'required',
    'must be at least X character': 'must be at least X character',

    // Common
    'Active': 'Active',
    'Inactive': 'Inactive',
    'N/A': 'N/A',
    'Submit': 'Submit',
    'Manage': 'Manage',
    'Logout': 'Logout',
    'Reset': 'Reset',
    'Error': 'Error',
    'Success': 'Success',
    'No Internet': 'No Internet',
    'Empty!': 'Empty!',
    'File': 'File',

    // Nav
    'Appoint.': 'Appoint.',
    'Chat': 'Chat',
    'Profile': 'Profile',

    // Appointment List
    'Appointments': 'Appointments',
    'No appointments found': 'No appointments found',
    'Welcome back': 'Welcome back',
    'All': 'All',
    'All Types': 'All Types',
    'Consultation': 'Consultation',
    'Follow-up': 'Follow-up',
    'Routine Check': 'Routine Check',
    'Urgent': 'Urgent',
    'Surgery': 'Surgery',
    'Status Filter Tabs': 'Status Filter Tabs',
    'Type Filter': 'Type Filter',

    // Appointment Info
    'Appointment Details': 'Appointment Details',
    'Patient': 'Patient',
    'Name (Tap for Profile)': 'Name (Tap for Profile)',
    'Name': 'Name',
    'Address': 'Address',
    'Gender': 'Gender',
    'Birth Date': 'Birth Date',
    'Specialization': 'Specialization',
    'License No.': 'License No.',
    'Hour Rate': 'Hour Rate',
    'Qualifications': 'Qualifications',
    'Status': 'Status',
    'Room': 'Room',
    'Appointment': 'Appointment',
    'Date & Time': 'Date & Time',
    'Type': 'Type',
    'Closed At': 'Closed At',
    'Description': 'Description',
    'Attachments': 'Attachments',
    'Room Services': 'Room Services',
    'No services found': 'No services found',
    'Book Service': 'Book Service',
    'Please select a service': 'Please select a service',
    'Room not found': 'Room not found',
    'Room service booked successfully': 'Room service booked successfully',

    // Manage
    'Manage Appointment': 'Manage Appointment',
    'Close Appointment': 'Close Appointment',
    'Medical Record Type': 'Medical Record Type',
    'Enter diagnosis or treatment details...': 'Enter diagnosis or treatment details...',
    'Closing...': 'Closing...',
    'Please enter a description': 'Please enter a description',
    'Appointment closed successfully': 'Appointment closed successfully',
    'Failed to close appointment': 'Failed to close appointment',
    'Delete Appointment': 'Delete Appointment',
    'Are you sure you want to delete this appointment?': 'Are you sure you want to delete this appointment?',
    'Delete': 'Delete',
    'Cancel': 'Cancel',
    'Appointment deleted successfully': 'Appointment deleted successfully',

    // Employee
    'Loading Details': 'Loading Details',
    'Employee': 'Employee',
    'Schedules': 'Schedules',
    'Section': 'Section',
    'License': 'License',
    'Personal Information': 'Personal Information',
    'Full Name': 'Full Name',
    'Role': 'Role',

    // Select Section
    'Select Section': 'Select Section',

    // Chat
    'Chats': 'Chats',
    'New Chat': 'New Chat',
    'Type a message...': 'Type a message...',
    'Send image': 'Send image',
    'Image must be 1 MB or less': 'Image must be 1 MB or less',
    'Failed to load notifications': 'Failed to load notifications',

    // Profile
    'Professional Info': 'Professional Info',
    'License No': 'License No',
    'Contract End': 'Contract End',
    'Medical Records': 'Medical Records',
    'Language': 'Language',
    'English': 'English',
    'Arabic': 'Arabic',

    // Patient
    'Patient Details': 'Patient Details',

    // Medical Record
    'Medical Record': 'Medical Record',
    'Record Details': 'Record Details',
    'Date': 'Date',

    // Notifications
    'Notifications': 'Notifications',
    'Mark all read': 'Mark all read',
    'No notifications': 'No notifications',

    // Profile Medical Record Types
    'Lab': 'Lab',
    'Radiology': 'Radiology',
    'Treatment': 'Treatment',
    'Diagnosis': 'Diagnosis',
  };

  static const _arabicKeys = {
    // App
    'Doctor': 'طبيب',

    // Auth
    'Med-System\nEmployees': 'موظفو\nالنظام الطبي',
    'Try Again': 'حاول مرة أخرى',
    'Welcome Back': 'مرحباً بعودتك',
    'Sign in to your account': 'سجّل الدخول إلى حسابك',
    'Phone': 'الهاتف',
    'Password': 'كلمة المرور',
    'Password is required': 'كلمة المرور مطلوبة',
    'Login': 'تسجيل الدخول',
    'Phone Number is required': 'رقم الهاتف مطلوب',
    'Phone Number is not valid': 'رقم الهاتف غير صحيح',
    'must be a valid number': 'يجب أن يكون رقماً صالحاً',
    'invalid birth day': 'تاريخ الميلاد غير صحيح',
    'birth day is required': 'تاريخ الميلاد مطلوب',
    'required': 'مطلوب',
    'must be at least X character': 'يجب أن يحتوي على الأقل على حرف',

    // Common
    'Active': 'نشط',
    'Inactive': 'غير نشط',
    'N/A': 'غير متوفر',
    'Submit': 'إرسال',
    'Manage': 'إدارة',
    'Logout': 'تسجيل الخروج',
    'Reset': 'إعادة تعيين',
    'Error': 'خطأ',
    'Success': 'نجاح',
    'No Internet': 'لا يوجد اتصال',
    'Empty!': 'فارغ!',
    'File': 'ملف',

    // Nav
    'Appoint.': 'المواعيد',
    'Chat': 'المحادثة',
    'Profile': 'الملف الشخصي',

    // Appointment List
    'Appointments': 'المواعيد',
    'No appointments found': 'لم يتم العثور على مواعيد',
    'Welcome back': 'مرحباً بعودتك',
    'All': 'الكل',
    'All Types': 'جميع الأنواع',
    'Consultation': 'استشارة',
    'Follow-up': 'متابعة',
    'Routine Check': 'فحص روتيني',
    'Urgent': 'عاجل',
    'Surgery': 'جراحة',
    'Status Filter Tabs': 'فلتر الحالة',
    'Type Filter': 'فلتر النوع',

    // Appointment Info
    'Appointment Details': 'تفاصيل الموعد',
    'Patient': 'المريض',
    'Name (Tap for Profile)': 'الاسم (اضغط للملف الشخصي)',
    'Name': 'الاسم',
    'Address': 'العنوان',
    'Gender': 'الجنس',
    'Birth Date': 'تاريخ الميلاد',
    'Specialization': 'التخصص',
    'License No.': 'رقم الرخصة',
    'Hour Rate': 'أجر الساعة',
    'Qualifications': 'المؤهلات',
    'Status': 'الحالة',
    'Room': 'الغرفة',
    'Appointment': 'الموعد',
    'Date & Time': 'التاريخ والوقت',
    'Type': 'النوع',
    'Closed At': 'أُغلق في',
    'Description': 'الوصف',
    'Attachments': 'المرفقات',
    'Room Services': 'خدمات الغرفة',
    'No services found': 'لا توجد خدمات',
    'Book Service': 'حجز الخدمة',
    'Please select a service': 'يرجى اختيار خدمة',
    'Room not found': 'الغرفة غير موجودة',
    'Room service booked successfully': 'تم حجز خدمة الغرفة بنجاح',

    // Manage
    'Manage Appointment': 'إدارة الموعد',
    'Close Appointment': 'إغلاق الموعد',
    'Medical Record Type': 'نوع السجل الطبي',
    'Enter diagnosis or treatment details...': 'أدخل تفاصيل التشخيص أو العلاج...',
    'Closing...': 'جاري الإغلاق...',
    'Please enter a description': 'يرجى إدخال الوصف',
    'Appointment closed successfully': 'تم إغلاق الموعد بنجاح',
    'Failed to close appointment': 'فشل في إغلاق الموعد',
    'Delete Appointment': 'حذف الموعد',
    'Are you sure you want to delete this appointment?': 'هل أنت متأكد أنك تريد حذف هذا الموعد؟',
    'Delete': 'حذف',
    'Cancel': 'إلغاء',
    'Appointment deleted successfully': 'تم حذف الموعد بنجاح',

    // Employee
    'Loading Details': 'جاري تحميل التفاصيل',
    'Employee': 'الموظف',
    'Schedules': 'الجداول',
    'Section': 'القسم',
    'License': 'الرخصة',
    'Personal Information': 'المعلومات الشخصية',
    'Full Name': 'الاسم الكامل',
    'Role': 'الدور',

    // Select Section
    'Select Section': 'اختر القسم',

    // Chat
    'Chats': 'المحادثات',
    'New Chat': 'محادثة جديدة',
    'Type a message...': 'اكتب رسالة...',
    'Send image': 'إرسال صورة',
    'Image must be 1 MB or less': 'يجب ألا تتجاوز الصورة 1 ميجابايت',
    'Failed to load notifications': 'فشل في تحميل الإشعارات',

    // Profile
    'Professional Info': 'المعلومات المهنية',
    'License No': 'رقم الرخصة',
    'Contract End': 'نهاية العقد',
    'Medical Records': 'السجلات الطبية',
    'Language': 'اللغة',
    'English': 'الإنجليزية',
    'Arabic': 'العربية',

    // Patient
    'Patient Details': 'تفاصيل المريض',

    // Medical Record
    'Medical Record': 'السجل الطبي',
    'Record Details': 'تفاصيل السجل',
    'Date': 'التاريخ',

    // Notifications
    'Notifications': 'الإشعارات',
    'Mark all read': 'تعيين الكل كمقروء',
    'No notifications': 'لا توجد إشعارات',

    // Profile Medical Record Types
    'Lab': 'مختبر',
    'Radiology': 'أشعة',
    'Treatment': 'علاج',
    'Diagnosis': 'تشخيص',
  };
}
