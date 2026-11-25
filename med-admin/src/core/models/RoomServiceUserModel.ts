export type RoomServiceUserStatus = 'waiting' | 'done' | 'canceled';

export interface RoomServiceUserNestedService {
    id: number;
    name?: string;
    price?: string;
}

export interface RoomServiceUserNestedRoom {
    id: number;
    name?: string;
}

export interface RoomServiceUserNestedUser {
    id: number;
    first_name?: string;
    last_name?: string;
    phone?: string;
}

export interface RoomServiceUserNestedEmployee {
    id: number;
    user?: RoomServiceUserNestedUser;
    specialization?: string;
}

export interface RoomServiceUserModel {
    id: number;
    status: RoomServiceUserStatus | null;
    room_service?: RoomServiceUserNestedService;
    room?: RoomServiceUserNestedRoom;
    user?: RoomServiceUserNestedUser;
    employee?: RoomServiceUserNestedEmployee;
}

export interface RoomServiceUsersApiResponse {
    data: RoomServiceUserModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface RoomServiceUserApiResponse {
    data: RoomServiceUserModel;
    success: boolean;
    code: number;
    message: string;
}