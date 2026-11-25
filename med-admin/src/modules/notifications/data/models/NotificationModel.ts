export interface Notification {
    id: number;
    user_id: number;
    title: string;
    body: string;
    read_at: string | null;
    created_at: string;
}

export interface NotificationsApiResponse {
    data: Notification[];
    success: boolean;
    code: number;
    message: string;
}
