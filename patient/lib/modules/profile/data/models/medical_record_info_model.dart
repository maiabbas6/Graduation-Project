import '../../../../modules/appointments/data/models/attachment_model.dart';
import '../../../../modules/appointments/data/models/employee_model.dart';

class MedicalRecordInfoModel {
  final int id;
  final int userId;
  final int? employeeId;
  final DateTime date;
  final String description;
  final String type;
  final UserInfo? user;
  final EmployeeModel? employee;
  final List<AttachmentModel> attachments;
  final List<MedicalPlanModel> medicalPlans;

  MedicalRecordInfoModel({
    required this.id,
    required this.userId,
    this.employeeId,
    required this.date,
    required this.description,
    required this.type,
    this.user,
    this.employee,
    this.attachments = const [],
    this.medicalPlans = const [],
  });

  factory MedicalRecordInfoModel.fromJson(Map<String, dynamic> json) {
    return MedicalRecordInfoModel(
      id: json['id'],
      userId: json['user_id'],
      employeeId: json['employee_id'],
      date: DateTime.parse(json['date']),
      description: json['description'] ?? '',
      type: json['type'] ?? '',
      user: json['user'] != null ? UserInfo.fromJson(json['user']) : null,
      employee: json['employee'] != null
          ? EmployeeModel.fromJson(json['employee'])
          : null,
      attachments: (json['attatchments'] as List<dynamic>?)
              ?.map((e) => AttachmentModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      medicalPlans: (json['medical_plans'] as List<dynamic>?)
              ?.map((e) => MedicalPlanModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    );
  }
}

class MedicalPlanModel {
  final int id;
  final int employeeId;
  final int medicalRecordId;
  final String title;
  final String description;
  final DateTime createdAt;

  MedicalPlanModel({
    required this.id,
    required this.employeeId,
    required this.medicalRecordId,
    required this.title,
    required this.description,
    required this.createdAt,
  });

  factory MedicalPlanModel.fromJson(Map<String, dynamic> json) {
    return MedicalPlanModel(
      id: json['id'],
      employeeId: json['employee_id'],
      medicalRecordId: json['medical_record_id'],
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}
