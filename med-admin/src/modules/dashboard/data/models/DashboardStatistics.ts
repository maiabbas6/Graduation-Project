export interface DashboardCounts {
  ai_chats: number;
  ai_message: number;
  appointments: number;
  attatchments: number;
  attendances: number;
  employees: number;
  roles: number;
  rooms: number;
  room_services: number;
  section: number;
  users: number;
}

export interface DashboardStatistics {
  counts: DashboardCounts;
}

export interface StatisticsApiResponse {
  data: DashboardStatistics;
  success: boolean;
  code: number;
  message: string;
}