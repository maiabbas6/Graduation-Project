import '../../../appointments/data/models/employee_model.dart';
import 'medical_plan_model.dart';

class MedicalRecordDetailModel {
  final int id;
  final int userId;
  final int? employeeId;
  final DateTime date;
  final String description;
  final String type;
  final UserInfo? user;
  final EmployeeModel? employee;
  final List<MedicalPlanModel> medicalPlans;

  MedicalRecordDetailModel({
    required this.id,
    required this.userId,
    this.employeeId,
    required this.date,
    required this.description,
    required this.type,
    this.user,
    this.employee,
    this.medicalPlans = const [],
  });

  factory MedicalRecordDetailModel.fromJson(Map<String, dynamic> json) {
    return MedicalRecordDetailModel(
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
      medicalPlans: (json['medical_plans'] as List<dynamic>? ?? [])
          .map((e) => MedicalPlanModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}
