class MedicalRecordModel {
  final int id;
  final int userId;
  final int? employeeId;
  final DateTime date;
  final String description;
  final String type;

  MedicalRecordModel({
    required this.id,
    required this.userId,
    this.employeeId,
    required this.date,
    required this.description,
    required this.type,
  });

  factory MedicalRecordModel.fromJson(Map<String, dynamic> json) {
    return MedicalRecordModel(
      id: json['id'],
      userId: json['user_id'],
      employeeId: json['employee_id'],
      date: DateTime.parse(json['date']),
      description: json['description'] ?? '',
      type: json['type'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'employee_id': employeeId,
      'date': date.toIso8601String(),
      'description': description,
      'type': type,
    };
  }

  MedicalRecordModel copyWith({
    int? id,
    int? userId,
    int? employeeId,
    DateTime? date,
    String? description,
    String? type,
  }) {
    return MedicalRecordModel(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      employeeId: employeeId ?? this.employeeId,
      date: date ?? this.date,
      description: description ?? this.description,
      type: type ?? this.type,
    );
  }
}
