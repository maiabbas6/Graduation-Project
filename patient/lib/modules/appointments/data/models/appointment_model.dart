import 'attachment_model.dart';
import 'employee_model.dart';
import 'room_model.dart';

enum AppointmentStatus { 
  waiting,
  canceled,
  suspended,
  closed,
  pending;

  
}

enum AppointmentType { 
  consultation,
  followUp,
  routineCheck,
  urgent,
  surgery;

  @override
  String toString() {
    switch (this) {
      case  AppointmentType.consultation:
        return 'consultation';
      case AppointmentType.followUp:
        return 'follow-up';
      case AppointmentType.routineCheck:
        return 'routine-check';
      case AppointmentType.urgent:
        return 'urgent';
      case AppointmentType.surgery:
        return 'surgery';
    }
  }

}

class AppointmentModel {
  final int id;
  final int userId;
  final int employeeId;
  final int? roomId;
  final DateTime appointmentDateTime;
  final AppointmentType type;
  final String description;
  final DateTime? appointmentClosedAt;
  final AppointmentStatus status;
  final UserInfo? user;
  final EmployeeModel? employee;
  final RoomModel? room;
  final List<AttachmentModel>? attachments;

  AppointmentModel({
    required this.id,
    required this.userId,
    required this.employeeId,
    required this.roomId,
    required this.appointmentDateTime,
    required this.type,
    required this.description,
    this.appointmentClosedAt,
    required this.status,
    this.user,
    this.employee,
    this.room,
    this.attachments,
  });

  factory AppointmentModel.fromJson(Map<String, dynamic> json) {
    return AppointmentModel(
      id: json['id'],
      userId: json['user_id'],
      employeeId: json['employee_id'],
      roomId: json['room_id'],
      appointmentDateTime: DateTime.parse(json['appointment_date_time']),
      type: _parseType(json['type']),
      description: json['description'] ?? '',
      appointmentClosedAt: json['appointment_closed_at'] != null
          ? DateTime.parse(json['appointment_closed_at'])
          : null,
      status: _parseStatus(json['status']),
      user: json['user'] != null ? UserInfo.fromJson(json['user']) : null,
      employee: json['employee'] != null
          ? EmployeeModel.fromJson(json['employee'])
          : null,
      room: json['room'] != null ? RoomModel.fromJson(json['room']) : null,
      attachments: json['attatchments'] != null
          ? (json['attatchments'] as List)
              .map((e) => AttachmentModel.fromJson(e))
              .toList()
          : null,
    );
  }

  static AppointmentType _parseType(String type) {
    switch (type) {
      case 'consultation':
        return AppointmentType.consultation;
      case 'follow-up':
        return AppointmentType.followUp;
      case 'routine-check':
        return AppointmentType.routineCheck;
      case 'urgent':
        return AppointmentType.urgent;
      case 'surgery':
        return AppointmentType.surgery;
      default:
        return AppointmentType.consultation;
    }
  }

  static AppointmentStatus _parseStatus(String status) {
    switch (status) {
      case 'waiting':
        return AppointmentStatus.waiting;
      case 'canceled':
        return AppointmentStatus.canceled;
      case 'suspended':
        return AppointmentStatus.suspended;
      case 'closed':
        return AppointmentStatus.closed;
      case 'pending':
        return AppointmentStatus.pending;
      default:
        return AppointmentStatus.pending;
    }
  }
}
