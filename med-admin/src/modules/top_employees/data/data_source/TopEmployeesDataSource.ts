import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { TopEmployeeModel, TopEmployeesApiResponse } from '../models/TopEmployeeModel';

export class TopEmployeesDataSource {
    async getTopEmployees(): Promise<TopEmployeeModel[]> {
        const response = await networkHelper.get<TopEmployeesApiResponse>(ApiConst.topEmployees);
        return response.data.data;
    }
}

export const topEmployeesDataSource = new TopEmployeesDataSource();
