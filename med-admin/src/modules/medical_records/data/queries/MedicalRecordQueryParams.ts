import type { MedicalRecordType } from '../models/MedicalRecordModel';

export interface MedicalRecordQueryParams {
    user_id?: number;
    employee_id?: number;
    type?: MedicalRecordType;
    start_date?: string;
    end_date?: string;
    per_page?: number;
}
