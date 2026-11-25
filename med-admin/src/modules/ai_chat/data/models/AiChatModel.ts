export interface AiChatModel {
    id: number;
    user_id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

export interface AiChatsApiResponse {
    data: AiChatModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface AiChatMessageModel {
    id: number;
    chat_id: number;
    question: string;
    answer: string;
    image_path?: string | null;
    image_url?: string | null;
    created_at: string;
    updated_at: string;
}

export interface AiChatDetailModel {
    id: number;
    user_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    messages: AiChatMessageModel[];
}

export interface AiChatDetailApiResponse {
    data: AiChatDetailModel;
    success: boolean;
    code: number;
    message: string;
}

export interface AiChatMessageApiResponse {
    data: AiChatMessageModel;
    success: boolean;
    code: number;
    message: string;
}
