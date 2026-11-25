export interface RoomModel {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface RoomAppointmentModel {
    id: number;
    user_id: number;
    employee_id: number;
    room_id: number;
    appointment_date_time: string;
    type: string;
    description: string;
    appointment_closed_at: string | null;
    status: string;
}

export interface RoomDetailModel extends RoomModel {
    appointments: RoomAppointmentModel[];
}

export interface PaginatedRooms {
    current_page: number;
    data: RoomModel[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface RoomsApiResponse {
    data: PaginatedRooms;
    success: boolean;
    code: number;
    message: string;
}

export interface RoomApiResponse {
    data: RoomModel;
    success: boolean;
    code: number;
    message: string;
}

export interface RoomDetailApiResponse {
    data: RoomDetailModel;
    success: boolean;
    code: number;
    message: string;
}