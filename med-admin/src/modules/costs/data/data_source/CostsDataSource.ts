import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { CostDetailApiResponse, CostModel, CostsApiResponse } from '../../../../core/models/CostModel';

export class CostsDataSource {
    async getCosts(): Promise<CostModel[]> {
        const response = await networkHelper.get<CostsApiResponse>(ApiConst.costs);
        return response.data.data;
    }

    async getCost(id: number): Promise<CostModel> {
        const response = await networkHelper.get<CostDetailApiResponse>(ApiConst.costById(id));
        return response.data.data;
    }

    async markAsPaid(id: number): Promise<CostModel> {
        const response = await networkHelper.patch<CostDetailApiResponse>(ApiConst.costPay(id));
        return response.data.data;
    }

    async markAsUnpaid(id: number): Promise<CostModel> {
        const response = await networkHelper.patch<CostDetailApiResponse>(ApiConst.costUnpay(id));
        return response.data.data;
    }
}

export const costsDataSource = new CostsDataSource();
