// src/core/utils/handler.ts
import { DataState, DataStatus } from './dataState';

export async function handle<T>(process: () => Promise<T>): Promise<DataState<T>> {
  try {
    const result = await process();
    return new DataState<T>({
      data: result,
      status: DataStatus.SUCCESS,
    });
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.error('Handler Message: \n -----', error, '-----\n');
    }
    return new DataState<T>({
      status: DataStatus.ERROR,
      error: error.message || error,
    });
  }
}