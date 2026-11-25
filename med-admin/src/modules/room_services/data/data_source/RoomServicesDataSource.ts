import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { RoomServiceApiResponse, RoomServiceModel, RoomServicesApiResponse } from '../../../../core/models/RoomServiceModel';

interface MessageResponse {
    success: boolean;
    code: number;
    message: string;
}

export class RoomServicesDataSource {
  async getRoomServices(): Promise<RoomServiceModel[]> {
    const response = await networkHelper.get<RoomServicesApiResponse>(ApiConst.roomServices);
    return response.data.data;
  }

  async getRoomService(id: number): Promise<RoomServiceModel> {
    const response = await networkHelper.get<RoomServiceApiResponse>(ApiConst.roomServiceById(id));
    return response.data.data;
  }

  async createRoomService(name: string, price: string): Promise<RoomServiceModel> {
    const response = await networkHelper.post<RoomServiceApiResponse>(ApiConst.roomServices, { name, price });
    return response.data.data;
  }

  async updateRoomService(id: number, name: string, price: string): Promise<RoomServiceModel> {
    const response = await networkHelper.put<RoomServiceApiResponse>(ApiConst.roomServiceById(id), { name, price });
    return response.data.data;
  }

  async deleteRoomService(id: number): Promise<void> {
    await networkHelper.delete<MessageResponse>(ApiConst.roomServiceById(id));
  }
}

export const roomServicesDataSource = new RoomServicesDataSource();