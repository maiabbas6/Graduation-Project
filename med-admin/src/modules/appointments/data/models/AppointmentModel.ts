export type AppointmentStatus = 'waiting' | 'canceled' | 'suspended' | 'closed';

export type AppointmentType = 'consultation' | 'follow-up' | 'routine-check' | 'urgent' | 'surgery';

export interface AppointmentModel {
    id: number;
    user_id: number;
    employee_id: number | null;
    room_id: number | null;
    appointment_date_time: string | null;
    description: string | null;
    appointment_closed_at: string | null;
    status: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedAppointments {
    current_page: number;
    data: AppointmentModel[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface AppointmentsApiResponse {
    data: PaginatedAppointments;
    success: boolean;
    code: number;
    message: string;
}

export interface AppointmentUser {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
}

export interface AppointmentEmployee {
    id: number;
    user_id: number;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: number;
    qualifications: string;
    contract_end_date: string;
    is_active: boolean;
    user: AppointmentUser;
}

export interface AppointmentRoom {
    id: number;
    name: string;
}

export interface AppointmentAttachment {
    id: number;
    parent_type: string;
    parent_id: number;
    path: string;
    created_at: string;
    updated_at: string;
}

export interface AppointmentDetailModel extends AppointmentModel {
    appointment_date_time: string | null;
    user: AppointmentUser;
    employee: AppointmentEmployee | null;
    room: AppointmentRoom | null;
    attatchments: AppointmentAttachment[];
}

export interface AppointmentDetailApiResponse {
    data: AppointmentDetailModel;
    success: boolean;
    code: number;
    message: string;
}

export interface UpdateAppointmentPayload {
    status?: AppointmentStatus;
    room_id?: number;
    employee_id?: number;
    appointment_date_time?: string;
    appointment_closed_at?: string | null;
    description?: string;
    type?: AppointmentType;
}

export interface UpdateAppointmentApiResponse {
    data: AppointmentDetailModel;
    success: boolean;
    code: number;
    message: string;
}