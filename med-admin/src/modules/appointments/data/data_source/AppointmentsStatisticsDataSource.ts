import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { RoomModel, RoomsApiResponse } from '../../../../core/models/RoomModel';
import type { SectionModel, SectionsApiResponse } from '../../../../core/models/SectionModel';
import type { AppointmentsApiResponse, AppointmentDetailApiResponse, AppointmentDetailModel, PaginatedAppointments, UpdateAppointmentApiResponse, UpdateAppointmentPayload } from '../models/AppointmentModel';
import type { AppointmentQueryParams } from '../queries/AppointmentQueryParams';

export interface AppointmentFilterOption {
  id: number;
  name: string;
}

export class AppointmentsStatisticsDataSource {
  async getAppointments(page = 1, filters: AppointmentQueryParams = {}): Promise<PaginatedAppointments> {
    const params: Record<string, string> = { page: String(page) };
    if (filters.status) params.status = filters.status;
    if (filters.type) params.type = filters.type;
    if (filters.user_id !== undefined) params.user_id = String(filters.user_id);
    if (filters.employee_id !== undefined) params.employee_id = String(filters.employee_id);
    if (filters.room_id !== undefined) params.room_id = String(filters.room_id);
    if (filters.section_id !== undefined) params.section_id = String(filters.section_id);
    if (filters.before) params.before = filters.before;
    if (filters.after) params.after = filters.after;
    const response = await networkHelper.get<AppointmentsApiResponse>(ApiConst.statisticsAppointments, params);
    return response.data.data;
  }

  async getAppointment(id: number): Promise<AppointmentDetailModel> {
    const response = await networkHelper.get<AppointmentDetailApiResponse>(ApiConst.appointmentById(id));
    return response.data.data;
  }

  async updateAppointment(id: number, payload: UpdateAppointmentPayload): Promise<AppointmentDetailModel> {
    const response = await networkHelper.put<UpdateAppointmentApiResponse>(
      ApiConst.appointmentById(id),
      payload
    );
    return response.data.data;
  }

  async getRooms(): Promise<RoomModel[]> {
    const response = await networkHelper.get<RoomsApiResponse>(ApiConst.rooms, { page: '1' });
    return response.data.data.data;
  }

  async getSections(): Promise<SectionModel[]> {
    const response = await networkHelper.get<SectionsApiResponse>(ApiConst.sections);
    return response.data.data;
  }

  async getClientOptions(): Promise<AppointmentFilterOption[]> {
    const response = await networkHelper.get<{ data: Array<{ id: number; first_name: string; last_name: string }> }>(
      ApiConst.statisticsClients
    );
    return response.data.data.map((client) => ({
      id: client.id,
      name: `${client.first_name} ${client.last_name}`,
    }));
  }

  async getEmployeeOptions(): Promise<AppointmentFilterOption[]> {
    const response = await networkHelper.get<{ data: Array<{ id: number; user: { first_name: string; last_name: string } }> }>(
      ApiConst.statisticsEmployees
    );
    return response.data.data.map((employee) => ({
      id: employee.id,
      name: `${employee.user.first_name} ${employee.user.last_name}`,
    }));
  }
}

export const appointmentsStatisticsDataSource = new AppointmentsStatisticsDataSource();