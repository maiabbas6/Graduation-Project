export interface RoomUserNestedUser {
    id: number;
    first_name?: string;
    last_name?: string;
    phone?: string;
    gender?: string;
    birth?: string;
    address?: string;
}

export interface RoomUserNestedRoom {
    id: number;
    name?: string;
}

export interface RoomUserModel {
    id: number;
    user_id: number;
    room_id: number;
    left_at: string | null;
    created_at: string | null;
    user?: RoomUserNestedUser;
    room?: RoomUserNestedRoom;
}

export interface RoomUsersApiResponse {
    data: RoomUserModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface RoomUserApiResponse {
    data: RoomUserModel;
    success: boolean;
    code: number;
    message: string;
}