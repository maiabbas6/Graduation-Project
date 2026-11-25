export type MedicalRecordType = 'lab' | 'radiology' | 'treatment' | 'consultation' | 'diagnosis' | 'follow-up' | 'routine-check' | 'urgent';

export interface MRUser {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
}

export interface MREmployeeUser {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
}

export interface MREmployee {
    id: number;
    user_id: number;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: number;
    qualifications: string;
    contract_end_date: string | null;
    is_active: boolean;
    user: MREmployeeUser;
}

export interface MRAttachment {
    id: number;
    parent_type: string;
    parent_id: number;
    path: string;
    created_at: string;
    updated_at: string;
}

export interface MedicalRecordModel {
    id: number;
    user_id: number;
    employee_id: number;
    date: string;
    description: string;
    type: string;
    user: MRUser;
    employee: MREmployee;
    attatchments: MRAttachment[];
}

export interface MedicalRecordsApiResponse {
    data: MedicalRecordModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface MedicalRecordDetailApiResponse {
    data: MedicalRecordModel;
    success: boolean;
    code: number;
    message: string;
}
