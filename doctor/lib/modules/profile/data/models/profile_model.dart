import '../../../appointments/data/models/appointment_model.dart';
import '../../../appointments/data/models/employee_model.dart';
import 'medical_record_model.dart';

class ProfileModel {
  final int id;
  final String firstName;
  final String lastName;
  final String gender;
  final String phone;
  final DateTime birth;
  final String address;
  final EmployeeModel? employee;
  final List<MedicalRecordModel> medicalRecords;
  final List<AppointmentModel> appointments;

  ProfileModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.gender,
    required this.phone,
    required this.birth,
    required this.address,
    this.employee,
    required this.medicalRecords,
    required this.appointments,
  });

  String get fullName => '$firstName $lastName';

  factory ProfileModel.fromJson(Map<String, dynamic> json) {
    return ProfileModel(
      id: json['id'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      gender: json['gender'] ?? '',
      phone: json['phone'],
      birth: DateTime.parse(json['birth']),
      address: json['address'] ?? '',
      employee: json['employee'] != null
          ? EmployeeModel.fromJson(json['employee'] as Map<String, dynamic>)
          : null,
      medicalRecords: (json['medical_records'] as List<dynamic>?)
              ?.map((e) => MedicalRecordModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      appointments: (json['appointments'] as List<dynamic>?)
              ?.map((e) => AppointmentModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  ProfileModel copyWith({
    int? id,
    String? firstName,
    String? lastName,
    String? gender,
    String? phone,
    DateTime? birth,
    String? address,
    EmployeeModel? employee,
    List<MedicalRecordModel>? medicalRecords,
    List<AppointmentModel>? appointments,
  }) {
    return ProfileModel(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      gender: gender ?? this.gender,
      phone: phone ?? this.phone,
      birth: birth ?? this.birth,
      address: address ?? this.address,
      employee: employee ?? this.employee,
      medicalRecords: medicalRecords ?? this.medicalRecords,
      appointments: appointments ?? this.appointments,
    );
  }
}
