export interface TopEmployeeUser {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
    birth: string;
    address: string;
    overview: string | null;
}

export interface TopEmployeeSection {
    id: number;
    name: string;
    icon: string;
}

export interface TopEmployeeModel {
    id: number;
    user_id: number;
    section_id: number;
    specialization: string;
    license_no: string;
    hour_rate: string;
    qualifications: string;
    contract_end_date: string | null;
    is_active: boolean;
    clients_count: number;
    work_minutes: string;
    user: TopEmployeeUser;
    section: TopEmployeeSection;
}

export interface TopEmployeesApiResponse {
    data: TopEmployeeModel[];
    success: boolean;
    code: number;
    message: string;
}
