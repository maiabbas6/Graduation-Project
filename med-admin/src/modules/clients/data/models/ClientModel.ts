export interface ClientModel {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    birth: string;
    address: string;
    gender: string;
    overview: string | null;
    created_at: string;
    updated_at: string;
    appointments_count: number;
    medical_records_count: number;
    chats_count: number;
}

export interface PaginatedClients {
    current_page: number;
    data: ClientModel[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface ClientsApiResponse {
    data: PaginatedClients;
    success: boolean;
    code: number;
    message: string;
}

export interface MedicalRecordModel {
    id: number;
    user_id: number;
    employee_id: number | null;
    date: string;
    description: string;
    type: string;
}

export interface ClientDetailModel {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
    medical_records: MedicalRecordModel[];
}

export interface ClientDetailApiResponse {
    data: ClientDetailModel;
    success: boolean;
    code: number;
    message: string;
}