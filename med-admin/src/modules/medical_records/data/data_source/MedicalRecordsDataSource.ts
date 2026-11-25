import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { MedicalRecordModel, MedicalRecordsApiResponse, MedicalRecordDetailApiResponse } from '../models/MedicalRecordModel';
import type { MedicalRecordQueryParams } from '../queries/MedicalRecordQueryParams';

export interface FilterOption {
    id: number;
    name: string;
}

export class MedicalRecordsDataSource {
    async getMedicalRecords(filters: MedicalRecordQueryParams = {}): Promise<MedicalRecordModel[]> {
        const params: Record<string, string> = {};
        if (filters.user_id !== undefined) params.user_id = String(filters.user_id);
        if (filters.employee_id !== undefined) params.employee_id = String(filters.employee_id);
        if (filters.type) params.type = filters.type;
        if (filters.start_date) params.start_date = filters.start_date;
        if (filters.end_date) params.end_date = filters.end_date;
        if (filters.per_page) params.per_page = String(filters.per_page);
        const response = await networkHelper.get<MedicalRecordsApiResponse>(ApiConst.medicalRecords, params);
        return response.data.data;
    }

    async getMedicalRecord(id: number): Promise<MedicalRecordModel> {
        const response = await networkHelper.get<MedicalRecordDetailApiResponse>(ApiConst.medicalRecordById(id));
        return response.data.data;
    }

    async getClientOptions(): Promise<FilterOption[]> {
        const response = await networkHelper.get<{ data: Array<{ id: number; first_name: string; last_name: string }> }>(
            ApiConst.statisticsClients
        );
        return response.data.data.map((client) => ({
            id: client.id,
            name: `${client.first_name} ${client.last_name}`,
        }));
    }

    async getEmployeeOptions(): Promise<FilterOption[]> {
        const response = await networkHelper.get<{ data: Array<{ id: number; user: { first_name: string; last_name: string } }> }>(
            ApiConst.statisticsEmployees
        );
        return response.data.data.map((employee) => ({
            id: employee.id,
            name: `${employee.user.first_name} ${employee.user.last_name}`,
        }));
    }
}

export const medicalRecordsDataSource = new MedicalRecordsDataSource();
