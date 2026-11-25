import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { ClientDetailApiResponse, ClientDetailModel, ClientsApiResponse, PaginatedClients } from '../models/ClientModel';

export class ClientsDataSource {
  async getClients(page = 1): Promise<PaginatedClients> {
    const response = await networkHelper.get<ClientsApiResponse>(ApiConst.statisticsClients, {
      page: String(page),
    });
    return response.data.data;
  }

  async getClientDetail(id: number): Promise<ClientDetailModel> {
    const response = await networkHelper.get<ClientDetailApiResponse>(ApiConst.userById(id));
    return response.data.data;
  }
}

export const clientsDataSource = new ClientsDataSource();