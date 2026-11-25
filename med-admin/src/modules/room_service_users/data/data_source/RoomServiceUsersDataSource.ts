import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { RoomModel, RoomsApiResponse } from '../../../../core/models/RoomModel';
import type { RoomServiceModel, RoomServicesApiResponse } from '../../../../core/models/RoomServiceModel';
import type { RoomServiceUserApiResponse, RoomServiceUserModel, RoomServiceUsersApiResponse, RoomServiceUserStatus } from '../../../../core/models/RoomServiceUserModel';
import type { PopupSelectOption } from '../../../../core/components/PopupSelect';

interface MessageResponse {
    success: boolean;
    code: number;
    message: string;
}

export class RoomServiceUsersDataSource {
  async getRoomServiceUsers(): Promise<RoomServiceUserModel[]> {
    const response = await networkHelper.get<RoomServiceUsersApiResponse>(ApiConst.roomServiceUsers);
    return response.data.data;
  }

  async getRoomServiceUser(id: number): Promise<RoomServiceUserModel> {
    const response = await networkHelper.get<RoomServiceUserApiResponse>(ApiConst.roomServiceUserById(id));
    return response.data.data;
  }

  async createRoomServiceUser(
    roomServiceId: number,
    roomId: number,
    userId: number,
    employeeId: number
  ): Promise<RoomServiceUserModel> {
    const response = await networkHelper.post<RoomServiceUserApiResponse>(ApiConst.roomServiceUsers, {
      room_service_id: roomServiceId,
      room_id: roomId,
      user_id: userId,
      employee_id: employeeId,
    });
    return response.data.data;
  }

  async updateRoomServiceUser(
    id: number,
    roomServiceId: number,
    roomId: number,
    userId: number,
    employeeId: number
  ): Promise<RoomServiceUserModel> {
    const response = await networkHelper.put<RoomServiceUserApiResponse>(ApiConst.roomServiceUserById(id), {
      room_service_id: roomServiceId,
      room_id: roomId,
      user_id: userId,
      employee_id: employeeId,
    });
    return response.data.data;
  }

  async deleteRoomServiceUser(id: number): Promise<void> {
    await networkHelper.delete<MessageResponse>(ApiConst.roomServiceUserById(id));
  }

  async changeStatus(id: number, status: RoomServiceUserStatus): Promise<void> {
    await networkHelper.patch<MessageResponse>(ApiConst.roomServiceUserStatusById(id), { status });
  }

  async getRoomServices(): Promise<RoomServiceModel[]> {
    const response = await networkHelper.get<RoomServicesApiResponse>(ApiConst.roomServices);
    return response.data.data;
  }

  async getRooms(): Promise<RoomModel[]> {
    const response = await networkHelper.get<RoomsApiResponse>(ApiConst.rooms, { page: '1' });
    return response.data.data.data;
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

  async getEmployees(): Promise<PopupSelectOption[]> {
    const response = await networkHelper.get<{ data: { data: Array<{ id: number; user: { first_name: string; last_name: string } }> } }>(
      ApiConst.statisticsEmployees
    );
    return response.data.data.data.map((employee) => ({
      id: employee.id,
      name: `${employee.user.first_name} ${employee.user.last_name}`.trim(),
    }));
  }
}

export const roomServiceUsersDataSource = new RoomServiceUsersDataSource();