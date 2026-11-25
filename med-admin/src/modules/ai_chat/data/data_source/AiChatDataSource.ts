import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type {
  AiChatDetailApiResponse,
  AiChatDetailModel,
  AiChatMessageApiResponse,
  AiChatMessageModel,
  AiChatsApiResponse,
  AiChatModel,
} from '../models/AiChatModel';

export class AiChatDataSource {
  async getChats(): Promise<AiChatModel[]> {
    const response = await networkHelper.get<AiChatsApiResponse>(ApiConst.aiChats);
    return response.data.data;
  }

  async getChatDetail(id: number): Promise<AiChatDetailModel> {
    const response = await networkHelper.get<AiChatDetailApiResponse>(ApiConst.aiChatById(id));
    return response.data.data;
  }

  async createChat(message: string, image?: File): Promise<AiChatDetailModel> {
    const files = image ? { image } : undefined;
    const response = await networkHelper.post<AiChatDetailApiResponse>(ApiConst.newAiChat, { message }, files);
    return response.data.data;
  }

  async sendMessage(id: number, message: string, image?: File): Promise<AiChatMessageModel> {
    const files = image ? { image } : undefined;
    const response = await networkHelper.post<AiChatMessageApiResponse>(ApiConst.aiChatMessage(id), { message }, files);
    return response.data.data;
  }
}

export const aiChatDataSource = new AiChatDataSource();
