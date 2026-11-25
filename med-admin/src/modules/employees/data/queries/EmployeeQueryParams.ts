export type EmployeeActiveFilter = '' | 'active' | 'inactive';

export interface EmployeeQueryParams {
    section_id?: number;
    specialization?: string;
    is_active?: boolean;
    name?: string;
}