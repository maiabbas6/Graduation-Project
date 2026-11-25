export interface RoomServiceModel {
    id: number;
    name: string;
    price: string;
}

export interface RoomServicesApiResponse {
    data: RoomServiceModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface RoomServiceApiResponse {
    data: RoomServiceModel;
    success: boolean;
    code: number;
    message: string;
}
