export type AttendanceType = 'in' | 'out';

export interface AttendanceModel {
    id: number;
    employee_id: number;
    date_time: string;
    type: AttendanceType;
    created_at: string;
    updated_at: string;
}

export interface CreateAttendancePayload {
    employee_id: number;
    date_time: string;
    type: AttendanceType;
}

export interface AttendanceApiResponse {
    data: AttendanceModel;
    success: boolean;
    code: number;
    message: string;
}

export interface PaginatedAttendances {
    current_page: number;
    data: AttendanceModel[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface AttendancesApiResponse {
    data: PaginatedAttendances;
    success: boolean;
    code: number;
    message: string;
}

export interface AttendanceScheduleDiffAttendance {
    id: number;
    type: AttendanceType;
    time: string;
    diff_minutes: number;
}

export interface AttendanceScheduleDiffItem {
    date: string;
    day: number;
    schedule: {
        start_at: string;
        end_at: string;
    };
    attendances: AttendanceScheduleDiffAttendance[];
}

export interface AttendanceScheduleDiffApiResponse {
    data: AttendanceScheduleDiffItem[];
    success: boolean;
    code: number;
    message: string;
}