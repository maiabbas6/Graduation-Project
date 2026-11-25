import type { AppointmentStatus, AppointmentType } from '../models/AppointmentModel';

export interface AppointmentQueryParams {
    status?: AppointmentStatus;
    type?: AppointmentType;
    user_id?: number;
    employee_id?: number;
    room_id?: number;
    section_id?: number;
    before?: string;
    after?: string;
}