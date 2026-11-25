// src/core/hooks/useSendData.ts
import { useState } from 'react';
import { DataState, DataStatus } from '../utils/dataState';
import { handle } from '../utils/handler';

interface SendDataOptions<T> {
  withLoader?: boolean; 
  withSnackBar?: boolean; 
  onSuccess?: (data: T) => void; 
  onFail?: (error: any) => void; 
}

export function useSendData<T, D = any>(
  apiCall: (data: D) => Promise<T>,
  options?: SendDataOptions<T>
) {
  const [state, setState] = useState<DataState<T>>(
    new DataState<T>({ status: DataStatus.INIT }) 
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendData = async (payload: D) => {
    setState(new DataState<T>({ status: DataStatus.LOADING })); 
    
    if (options?.withLoader) {
      setIsSubmitting(true);
    }

    const result = await handle<T>(() => apiCall(payload)); 
    setState(result);

    if (options?.withLoader) {
      setIsSubmitting(false);
    }

    result.fold(
      (err) => {
        if (options?.onFail) options.onFail(err);
        if (options?.withSnackBar) {
          alert(`Error: ${err}`); 
        }
      },
      (data) => {
        if (options?.onSuccess) options.onSuccess(data);
      }
    );
  };

  return {
    state,
    sendData,
    isSubmitting,
    isLoading: state.isLoading,
  };
}