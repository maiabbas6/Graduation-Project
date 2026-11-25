import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { RoomModel, RoomsApiResponse } from '../../../../core/models/RoomModel';
import type { RoomUserApiResponse, RoomUserModel, RoomUsersApiResponse } from '../../../../core/models/RoomUserModel';
import type { PopupSelectOption } from '../../../../core/components/PopupSelect';

interface MessageResponse {
    success: boolean;
    code: number;
    message: string;
}

export class RoomUsersDataSource {
  async getRoomUsers(): Promise<RoomUserModel[]> {
    const response = await networkHelper.get<RoomUsersApiResponse>(ApiConst.roomUsers);
    return response.data.data;
  }

  async getRoomUser(id: number): Promise<RoomUserModel> {
    const response = await networkHelper.get<RoomUserApiResponse>(ApiConst.roomUserById(id));
    return response.data.data;
  }

  async createRoomUser(userId: number, roomId: number): Promise<RoomUserModel> {
    const response = await networkHelper.post<RoomUserApiResponse>(ApiConst.roomUsers, {
      user_id: userId,
      room_id: roomId,
    });
    return response.data.data;
  }

  async updateRoomUser(id: number, userId: number, roomId: number): Promise<RoomUserModel> {
    const response = await networkHelper.put<RoomUserApiResponse>(ApiConst.roomUserById(id), {
      user_id: userId,
      room_id: roomId,
    });
    return response.data.data;
  }

  async deleteRoomUser(id: number): Promise<void> {
    await networkHelper.delete<MessageResponse>(ApiConst.roomUserById(id));
  }

  async getUsers(): Promise<PopupSelectOption[]> {
    const response = await networkHelper.get<{ data: Array<{ id: number; first_name: string; last_name: string }> }>(
      ApiConst.user
    );
    return response.data.data.map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`.trim(),
    }));
  }

  async getRooms(): Promise<RoomModel[]> {
    const response = await networkHelper.get<RoomsApiResponse>(ApiConst.rooms, { page: '1' });
    return response.data.data.data;
  }
}

export const roomUsersDataSource = new RoomUsersDataSource();