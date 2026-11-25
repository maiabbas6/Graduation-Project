// src/core/utils/dataState.ts

export const DataStatus = {
  INIT: 'init',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type DataStatusType = typeof DataStatus[keyof typeof DataStatus];

export class DataState<T> {
  readonly data?: T;
  readonly error?: any;
  readonly status: DataStatusType;

  constructor({ data, error, status = DataStatus.INIT }: { data?: T; error?: any; status?: DataStatusType }) {
    this.data = data;
    this.error = error;
    this.status = status;
  }

  fold<B>(fail: (err: any) => B, success: (data: T) => B): B | null {
    if (this.status === DataStatus.ERROR) {
      return fail(this.error);
    } else if (this.status === DataStatus.SUCCESS) {
      return success(this.data as T);
    }
    return null;
  }

  get isError(): boolean { return this.status === DataStatus.ERROR; }
  get isSuccess(): boolean { return this.status === DataStatus.SUCCESS; }
  get isLoading(): boolean { return this.status === DataStatus.LOADING; }
  get isInit(): boolean { return this.status === DataStatus.INIT; }
}