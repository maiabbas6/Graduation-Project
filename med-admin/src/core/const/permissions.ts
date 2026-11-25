export const PERMISSIONS = {
  EXPORT_STATISTICS: 'statistics.export',
  EXPORT_MEDICAL_RECORDS: 'medical_record.export',
  EXPORT_MEDICAL_PLANS: 'medical_plan.export',
  EXPORT_COSTS: 'cost.export',
  EXPORT_ROOMS: 'room.export',
  EXPORT_ROOM_SERVICES: 'room_service.export',
  EXPORT_EMPLOYEES: 'employee.export',
  EXPORT_USERS: 'user.export',
  EXPORT_APPOINTMENTS: 'appointment.export',
  EXPORT_SECTIONS: 'section.export',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
