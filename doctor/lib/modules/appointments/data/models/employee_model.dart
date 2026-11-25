import 'package:doctor/modules/appointments/data/models/attachment_model.dart';
import 'package:doctor/modules/appointments/data/models/section_model.dart';

class UserInfo {
  final int id;
  final String firstName;
  final String lastName;
  final String gender;
  final String phone;
  final String birth;
  final String address;
  final List<String> roles;
  final List<String> permissions;

  UserInfo({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.gender,
    required this.phone,
    required this.birth,
    required this.address,
    required this.roles,
    required this.permissions,
  });

  factory UserInfo.fromJson(Map<String, dynamic> json) {
    return UserInfo(
      id: json['id'] ?? 0,
      firstName: json['first_name'] ?? '',
      lastName: json['last_name'] ?? '',
      gender: json['gender'] ?? '',
      phone: json['phone'] ?? '',
      birth: json['birth'] ?? '',
      address: json['address'] ?? '',
      roles: (json['roles'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
      permissions: (json['permissions'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
    );
  }

  String get fullName => [
        if (firstName.isNotEmpty) firstName,
        if (lastName.isNotEmpty) lastName,
      ].join(' ');
}

class ScheduleModel {
  final int id;
  final int employeeId;
  final int day;
  final String startAt;
  final String endAt;
  final String createdAt;
  final String updatedAt;

  ScheduleModel({
    required this.id,
    required this.employeeId,
    required this.day,
    required this.startAt,
    required this.endAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ScheduleModel.fromJson(Map<String, dynamic> json) {
    return ScheduleModel(
      id: json['id'] ?? 0,
      employeeId: json['employee_id'] ?? 0,
      day: json['day'] ?? 0,
      startAt: json['start_at'] ?? '',
      endAt: json['end_at'] ?? '',
      createdAt: json['created_at'] ?? '',
      updatedAt: json['updated_at'] ?? '',
    );
  }
}

class EmployeeModel {
  final int id;
  final int userId;
  final int sectionId;
  final String specialization;
  final String licenseNo;
  final double hourRate;
  final String qualifications;
  final String contractEndDate;
  final bool isActive;
  final UserInfo? user;
  final SectionModel? section;
  final List<AttachmentModel> attachments;
  final List<ScheduleModel> schedules;

  EmployeeModel({
    required this.id,
    required this.userId,
    required this.sectionId,
    required this.specialization,
    required this.licenseNo,
    required this.hourRate,
    required this.qualifications,
    required this.contractEndDate,
    required this.isActive,
    this.user,
    this.section,
    List<AttachmentModel>? attachments,
    List<ScheduleModel>? schedules,
  })  : attachments = attachments ?? [],
        schedules = schedules ?? [];

  String get initials {
    final firstName = user?.firstName;
    final lastName = user?.lastName;
    final firstChar =
        (firstName != null && firstName.isNotEmpty) ? firstName[0] : '';
    final lastChar =
        (lastName != null && lastName.isNotEmpty) ? lastName[0] : '';
    if (firstChar.isEmpty && lastChar.isEmpty) return '?';
    return '$firstChar$lastChar'.toUpperCase();
  }

  factory EmployeeModel.fromJson(Map<String, dynamic> json) {
    return EmployeeModel(
      id: json['id'],
      userId: json['user_id'],
      sectionId: json['section_id'],
      specialization: json['specialization'] ?? '-',
      licenseNo: json['license_no'] ?? '',
      hourRate: (json['hour_rate'] as num)?.toDouble() ?? 0.0,
      qualifications: json['qualifications'],
      contractEndDate: json['contract_end_date'] ?? '',
      isActive: json['is_active'],
      user: json['user'] != null ? UserInfo.fromJson(json['user']) : null,
      section: json['section'] != null ? SectionModel.fromJson(json['section']) : null,
      attachments: ((json['attatchments'] ?? json['attachments']) as List<dynamic>?)
              ?.map((e) => AttachmentModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      schedules: (json['schedules'] as List<dynamic>?)
              ?.map((e) => ScheduleModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}


extension ScheduleDayExtension on ScheduleModel {
  String get dayName {
    switch (day) {
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
      default: return 'Unknown';
    }
  }
}
