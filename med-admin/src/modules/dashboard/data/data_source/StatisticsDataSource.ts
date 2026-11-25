import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { DashboardStatistics, StatisticsApiResponse } from '../models/DashboardStatistics';

export class StatisticsDataSource {
  async getStatistics(): Promise<DashboardStatistics> {
    const response = await networkHelper.get<StatisticsApiResponse>(ApiConst.statistics);
    return response.data.data;
  }
}

export const statisticsDataSource = new StatisticsDataSource();