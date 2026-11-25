import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { useSendData } from '../../../../core/hooks/useSendData';
import { aiChatDataSource } from '../../data/data_source/AiChatDataSource';
import type { AiChatDetailModel, AiChatModel } from '../../data/models/AiChatModel';

export function useAiChatsController(onCreated?: (chat: AiChatDetailModel) => void) {
  const [state, setState] = useState<DataState<AiChatModel[]>>(
    new DataState<AiChatModel[]>({ status: DataStatus.INIT })
  );

  const load = useCallback(async () => {
    setState(new DataState<AiChatModel[]>({ status: DataStatus.LOADING }));
    const result = await handle(() => aiChatDataSource.getChats());
    setState(result);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createChat = useSendData<AiChatDetailModel, { message: string; image?: File }>(
    ({ message, image }) => aiChatDataSource.createChat(message, image),
    { withLoader: true, onSuccess: (chat) => onCreated?.(chat) }
  );

  return {
    state,
    refetch: load,
    createChat,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}
