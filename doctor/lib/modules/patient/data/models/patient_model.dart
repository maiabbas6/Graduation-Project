import '../../../profile/data/models/medical_record_model.dart';

class PatientModel {
  final int id;
  final String firstName;
  final String lastName;
  final String gender;
  final String phone;
  final DateTime birth;
  final String address;
  final List<MedicalRecordModel> medicalRecords;

  PatientModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.gender,
    required this.phone,
    required this.birth,
    required this.address,
    required this.medicalRecords,
  });

  String get fullName => '$firstName $lastName';

  factory PatientModel.fromJson(Map<String, dynamic> json) {
    return PatientModel(
      id: json['id'],
      firstName: json['first_name'] ?? '',
      lastName: json['last_name'] ?? '',
      gender: json['gender'] ?? '',
      phone: json['phone'] ?? '',
      birth: json['birth'] != null ? DateTime.parse(json['birth']) : DateTime.now(),
      address: json['address'] ?? '',
      medicalRecords: (json['medical_records'] as List<dynamic>?)
              ?.map((e) => MedicalRecordModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}
