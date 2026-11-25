import 'appointment_model.dart';

class CostModel {
  final int id;
  final int userId;
  final int? appointmentId;
  final int? roomServiceUserId;
  final String description;
  final double amount;
  final CostStatus status;
  final DateTime? paidAt;
  final AppointmentModel? appointment;

  CostModel({
    required this.id,
    required this.userId,
    required this.appointmentId,
    this.roomServiceUserId,
    required this.description,
    required this.amount,
    required this.status,
    this.paidAt,
    this.appointment,
  });

  factory CostModel.fromJson(Map<String, dynamic> json) {
    return CostModel(
      id: json['id'],
      userId: json['user_id'],
      appointmentId: json['appointment_id'],
      roomServiceUserId: json['room_service_user_id'],
      description: json['description'] ?? '',
      amount: (json['amount'] as num).toDouble(),
      status: _parseStatus(json['status']),
      paidAt: json['paid_at'] != null ? DateTime.parse(json['paid_at']) : null,
      appointment: json['appointment'] != null
          ? AppointmentModel.fromJson(json['appointment'])
          : null,
    );
  }

  static CostStatus _parseStatus(String status) {
    switch (status) {
      case 'paid':
        return CostStatus.paid;
      case 'unpaid':
        return CostStatus.unpaid;
      default:
        return CostStatus.unpaid;
    }
  }
}

enum CostStatus { paid, unpaid }
