import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { MedicalPlanModel, MedicalPlansApiResponse, MedicalPlanDetailApiResponse, PaginatedMedicalPlans } from '../models/MedicalPlanModel';
import type { FilterOption } from '../../medical_records/data/data_source/MedicalRecordsDataSource';

export class MedicalPlansDataSource {
    async getMedicalPlans(page = 1, userId?: number): Promise<PaginatedMedicalPlans> {
        const params: Record<string, string> = { page: String(page) };
        if (userId !== undefined) params.user_id = String(userId);
        const response = await networkHelper.get<MedicalPlansApiResponse>(ApiConst.medicalPlans, params);
        return response.data.data;
    }

    async getMedicalPlan(id: number): Promise<MedicalPlanModel> {
        const response = await networkHelper.get<MedicalPlanDetailApiResponse>(ApiConst.medicalPlanById(id));
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
}

export const medicalPlansDataSource = new MedicalPlansDataSource();
