export interface MPEmployeeUser {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
}

export interface MPEmployee {
    id: number;
    user_id: number;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: number;
    qualifications: string;
    contract_end_date: string | null;
    is_active: boolean;
    user: MPEmployeeUser;
}

export interface MPMedicalRecord {
    id: number;
    user_id: number;
    employee_id: number;
    date: string;
    description: string;
    type: string;
}

export interface MedicalPlanModel {
    id: number;
    employee_id: number;
    medical_record_id: number;
    title: string;
    description: string;
    employee: MPEmployee;
    medical_record: MPMedicalRecord;
    created_at: string;
}

export interface PaginatedMedicalPlans {
    current_page: number;
    data: MedicalPlanModel[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface MedicalPlansApiResponse {
    data: PaginatedMedicalPlans;
    success: boolean;
    code: number;
    message: string;
}

export interface MedicalPlanDetailApiResponse {
    data: MedicalPlanModel;
    success: boolean;
    code: number;
    message: string;
}
