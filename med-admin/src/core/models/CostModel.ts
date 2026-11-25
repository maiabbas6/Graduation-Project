export interface CostUser {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    birth: string;
    address: string;
}

export interface CostModel {
    id: number;
    user_id: number;
    appointment_id: number | null;
    room_service_user_id: number | null;
    description: string;
    amount: number;
    status: string;
    paid_at: string | null;
    user: CostUser;
}

export interface CostsApiResponse {
    data: CostModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface CostDetailApiResponse {
    data: CostModel;
    success: boolean;
    code: number;
    message: string;
}
