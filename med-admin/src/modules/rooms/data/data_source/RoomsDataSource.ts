import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { PaginatedRooms, RoomApiResponse, RoomDetailApiResponse, RoomDetailModel, RoomModel, RoomsApiResponse } from '../../../../core/models/RoomModel';

interface MessageResponse {
    success: boolean;
    code: number;
    message: string;
}

export class RoomsDataSource {
  async getRooms(page = 1): Promise<PaginatedRooms> {
    const response = await networkHelper.get<RoomsApiResponse>(ApiConst.rooms, { page: String(page) });
    return response.data.data;
  }

  async getRoom(id: number): Promise<RoomDetailModel> {
    const response = await networkHelper.get<RoomDetailApiResponse>(ApiConst.roomById(id));
    return response.data.data;
  }

  async createRoom(name: string): Promise<RoomModel> {
    const response = await networkHelper.post<RoomApiResponse>(ApiConst.rooms, { name });
    return response.data.data;
  }

  async updateRoom(id: number, name: string): Promise<RoomModel> {
    const response = await networkHelper.put<RoomApiResponse>(ApiConst.roomById(id), { name });
    return response.data.data;
  }

  async deleteRoom(id: number): Promise<void> {
    await networkHelper.delete<MessageResponse>(ApiConst.roomById(id));
  }
}

export const roomsDataSource = new RoomsDataSource();