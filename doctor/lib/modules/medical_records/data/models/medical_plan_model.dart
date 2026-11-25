import 'package:intl/intl.dart';

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
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'])
          : DateTime.now(),
    );
  }

  String get formattedDate =>
      DateFormat('MMM dd, yyyy - HH:mm').format(createdAt.toLocal());
}
