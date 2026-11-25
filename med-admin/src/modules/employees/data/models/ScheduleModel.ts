export interface ScheduleModel {
    id: number;
    employee_id: number;
    day: number;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
}

export interface CreateSchedulePayload {
    employee_id: number;
    day: number;
    start_at: string;
    end_at: string;
}

export interface ScheduleApiResponse {
    data: ScheduleModel;
    success: boolean;
    code: number;
    message: string;
}