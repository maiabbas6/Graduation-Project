import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { PaginatedSystemLogs, SystemLogApiResponse, SystemLogDetailModel, SystemLogsApiResponse } from '../models/SystemLogModel';
import type { SystemLogQueryParams } from '../queries/SystemLogQueryParams';

export class SystemLogsDataSource {
  async getSystemLogs(page = 1, filters: SystemLogQueryParams = {}): Promise<PaginatedSystemLogs> {
    const params: Record<string, string> = { page: String(page) };
    if (filters.user_id !== undefined) params.user_id = String(filters.user_id);
    if (filters.start_date) params.start_date = filters.start_date;
    if (filters.end_date) params.end_date = filters.end_date;
    const response = await networkHelper.get<SystemLogsApiResponse>(ApiConst.systemLogs, params);
    return response.data.data;
  }

  async getSystemLogDetail(id: number): Promise<SystemLogDetailModel> {
    const response = await networkHelper.get<SystemLogApiResponse>(ApiConst.systemLogById(id));
    return response.data.data;
  }
}

export const systemLogsDataSource = new SystemLogsDataSource();
