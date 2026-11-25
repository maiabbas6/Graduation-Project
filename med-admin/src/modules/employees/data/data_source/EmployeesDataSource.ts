import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { SectionModel, SectionsApiResponse } from '../../../../core/models/SectionModel';
import type {
    AttendanceApiResponse,
    AttendanceScheduleDiffApiResponse,
    AttendanceScheduleDiffItem,
    AttendancesApiResponse,
    CreateAttendancePayload,
    PaginatedAttendances,
} from '../models/AttendanceModel';
import type {
    CreateSchedulePayload,
    ScheduleApiResponse,
} from '../models/ScheduleModel';
import type {
    CreateEmployeeApiResponse,
    CreateEmployeePayload,
    EmployeeDetailApiResponse,
    EmployeeDetailModel,
    EmployeesApiResponse,
    PaginatedEmployees,
    UpdateEmployeePayload,
} from '../models/EmployeeModel';
import type { EmployeeQueryParams } from '../queries/EmployeeQueryParams';

export class EmployeesDataSource {
  async createAttendance(payload: CreateAttendancePayload): Promise<void> {
    const dateTime = payload.date_time.replace('T', ' ').replace(/Z$/, '');
    const body: Record<string, string> = {
      employee_id: String(payload.employee_id),
      date_time: dateTime.length === 16 ? `${dateTime}:00` : dateTime,
      type: payload.type,
    };
    await networkHelper.post<AttendanceApiResponse>(ApiConst.attendances, body);
  }

  async createSchedule(payload: CreateSchedulePayload): Promise<void> {
    const body: Record<string, string> = {
      employee_id: String(payload.employee_id),
      day: String(payload.day),
      start_at: payload.start_at,
      end_at: payload.end_at,
    };
    await networkHelper.post<ScheduleApiResponse>(ApiConst.schedules, body);
  }

  async getEmployeeAttendances(id: number, page = 1): Promise<PaginatedAttendances> {
    const response = await networkHelper.get<AttendancesApiResponse>(
      ApiConst.employeeAttendances(id),
      { page: String(page) }
    );
    return response.data.data;
  }

  async getAttendanceScheduleDiff(id: number): Promise<AttendanceScheduleDiffItem[]> {
    const response = await networkHelper.get<AttendanceScheduleDiffApiResponse>(
      ApiConst.employeeAttendanceScheduleDiff(id)
    );
    return response.data.data;
  }

  async getEmployees(page = 1, filters: EmployeeQueryParams = {}): Promise<PaginatedEmployees> {
    const params: Record<string, string> = { page: String(page) };
    if (filters.section_id !== undefined) {
      params.section_id = String(filters.section_id);
    }
    if (filters.specialization) {
      params.specialization = filters.specialization;
    }
    if (filters.is_active !== undefined) {
      params.is_active = filters.is_active ? '1' : '0';
    }
    if (filters.name) {
      params.name = filters.name;
    }
    const response = await networkHelper.get<EmployeesApiResponse>(ApiConst.statisticsEmployees, params);
    return {
      ...response.data.data,
      data: response.data.data.data.map((employee) => ({
        ...employee,
        section: {
          ...employee.section,
          icon: ApiConst.baseUrl(employee.section.icon ?? ''),
        },
      })),
    };
  }

  async createEmployee(payload: CreateEmployeePayload): Promise<EmployeeDetailModel> {
    const { attatchments, ...rest } = payload;
    const body: Record<string, string> = {
      ...rest,
      section_id: String(rest.section_id),
      hour_rate: String(rest.hour_rate),
      is_active: rest.is_active ? '1' : '0',
    };
    const files: Record<string, File[]> = attatchments.length > 0
      ? { attatchments }
      : {};
    const response = await networkHelper.post<CreateEmployeeApiResponse>(
      ApiConst.employees,
      body,
      files
    );
    return response.data.data;
  }

  async getEmployee(id: number): Promise<EmployeeDetailModel> {
    const response = await networkHelper.get<EmployeeDetailApiResponse>(ApiConst.employeeById(id));
    return response.data.data;
  }

  async updateEmployee(id: number, payload: UpdateEmployeePayload): Promise<EmployeeDetailModel> {
    const body: Record<string, string> = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone: payload.phone,
      birth: payload.birth,
      gender: payload.gender,
      address: payload.address,
      role: payload.role,
      section_id: String(payload.section_id),
      specialization: payload.specialization,
      license_no: payload.license_no,
      hour_rate: String(payload.hour_rate),
      qualifications: payload.qualifications,
      contract_end_date: payload.contract_end_date,
      is_active: payload.is_active ? '1' : '0',
    };
    if (payload.password) body.password = payload.password;
    const response = await networkHelper.put<EmployeeDetailApiResponse>(
      ApiConst.employeeById(id),
      body
    );
    return response.data.data;
  }

  async getSections(): Promise<SectionModel[]> {
    const response = await networkHelper.get<SectionsApiResponse>(ApiConst.sections);
    return response.data.data;
  }
}

export const employeesDataSource = new EmployeesDataSource();