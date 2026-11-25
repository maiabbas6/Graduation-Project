// src/core/api/networkHelper.ts
import { AppResponse } from './appResponse';

export interface NetworkHelper {
  get<T>(url: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<AppResponse<T>>;
  post<T>(url: string, body?: any, files?: Record<string, File | File[]>, headers?: Record<string, string>): Promise<AppResponse<T>>;
  put<T>(url: string, body?: any, files?: Record<string, File | File[]>, headers?: Record<string, string>): Promise<AppResponse<T>>;
  patch<T>(url: string, body?: any, headers?: Record<string, string>): Promise<AppResponse<T>>;
  delete<T>(url: string, body?: any, headers?: Record<string, string>): Promise<AppResponse<T>>;
}