import type { SectionModel } from '../../../../core/models/SectionModel';
import type { AttendanceModel } from './AttendanceModel';

export interface EmployeeUser {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
    overview?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface EmployeeSection {
    id: number;
    name: string;
    icon: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface EmployeeModel {
    id: number;
    user_id: number;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: string | number;
    qualifications: string;
    contract_end_date: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    appointments_count?: number;
    attendances_count?: number;
    section: EmployeeSection;
    user: EmployeeUser;
    attendances?: AttendanceModel[];
}

export interface EmployeeUserDetail extends EmployeeUser {
    roles: string[];
    permissions: string[];
}

export interface EmployeeAttachment {
    id: number;
    parent_type: string;
    parent_id: number;
    path: string;
    created_at: string;
    updated_at: string;
}

export interface EmployeeSchedule {
    id: number;
    employee_id: number;
    day: number;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
}

export interface EmployeeDetailModel extends EmployeeModel {
    user: EmployeeUserDetail;
    attatchments: EmployeeAttachment[];
    schedules: EmployeeSchedule[];
}

export interface PaginatedEmployees {
    current_page: number;
    data: EmployeeModel[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface EmployeesApiResponse {
    data: PaginatedEmployees;
    success: boolean;
    code: number;
    message: string;
}

export interface EmployeeDetailApiResponse {
    data: EmployeeDetailModel;
    success: boolean;
    code: number;
    message: string;
}

export interface CreateEmployeePayload {
    first_name: string;
    last_name: string;
    phone: string;
    password: string;
    birth: string;
    gender: 'male' | 'female';
    address: string;
    role: string;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: number;
    qualifications: string;
    contract_end_date: string;
    is_active: boolean;
    attatchments: File[];
}

export interface UpdateEmployeePayload {
    first_name: string;
    last_name: string;
    phone: string;
    password?: string;
    birth: string;
    gender: 'male' | 'female';
    address: string;
    role: string;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: number;
    qualifications: string;
    contract_end_date: string;
    is_active: boolean;
}

export interface CreateEmployeeApiResponse {
    data: EmployeeDetailModel;
    success: boolean;
    code: number;
    message: string;
}

export type { SectionModel };