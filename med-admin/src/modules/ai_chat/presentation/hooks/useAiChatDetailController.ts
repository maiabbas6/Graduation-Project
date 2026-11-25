import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import { aiChatDataSource } from '../../data/data_source/AiChatDataSource';
import type { AiChatDetailModel, AiChatMessageModel } from '../../data/models/AiChatModel';

export function useAiChatDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<AiChatDetailModel>(() =>
    aiChatDataSource.getChatDetail(id)
  );

  const sendMessage = useSendData<AiChatMessageModel, { message: string; image?: File }>(
    ({ message, image }) => aiChatDataSource.sendMessage(id, message, image),
    { withLoader: true, onSuccess: () => refetch() }
  );

  return { state, refetch, sendMessage, isLoading, isSuccess, isError };
}
