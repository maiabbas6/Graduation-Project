export interface SystemLogInfo {
    request_body: unknown;
    request_method: string;
}

export interface SystemLogModel {
    id: number;
    user_id: number;
    ip: string;
    route: string;
    info: SystemLogInfo;
    created_at: string;
    updated_at: string;
}

export interface PaginatedSystemLogs {
    data: SystemLogModel[];
    pages: number;
}

export interface SystemLogsApiResponse {
    data: PaginatedSystemLogs;
    success: boolean;
    code: number;
    message: string;
}

export interface SystemLogUserModel {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    birth: string;
    address: string;
    gender: string;
    overview: string | null;
    created_at: string;
    updated_at: string;
}

export interface SystemLogDetailModel extends SystemLogModel {
    user: SystemLogUserModel | null;
}

export interface SystemLogApiResponse {
    data: SystemLogDetailModel;
    success: boolean;
    code: number;
    message: string;
}
