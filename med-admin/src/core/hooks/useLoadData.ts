// src/core/hooks/useLoadData.ts
import { useState, useEffect, useCallback } from 'react';
import { DataState, DataStatus } from '../utils/dataState';
import { handle } from '../utils/handler';

interface LoadDataOptions<T> {
  onSuccess?: (data: T) => void;
  onFail?: (error: any) => void; 
}

export function useLoadData<T>(
  apiCall: () => Promise<T>, 
  options?: LoadDataOptions<T>
) {
  const [state, setState] = useState<DataState<T>>(
    new DataState<T>({ status: DataStatus.INIT }) 
  );

  const loadData = useCallback(async () => {
    setState(new DataState<T>({ status: DataStatus.LOADING })); 
    
    const result = await handle<T>(apiCall); 
    setState(result);

    result.fold(
      (err) => options?.onFail?.(err), 
      (data) => options?.onSuccess?.(data) 
    );
  }, [apiCall, options]);

  useEffect(() => {
    loadData();
  }, []);

  return {
    state,
    refetch: loadData,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}