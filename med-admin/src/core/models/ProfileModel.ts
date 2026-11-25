export interface AdminProfileModel {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
    employee: unknown;
    medical_records: unknown[];
    appointments: unknown[];
}

export interface ProfileApiResponse {
    data: AdminProfileModel;
    success: boolean;
    code: number;
    message: string;
}