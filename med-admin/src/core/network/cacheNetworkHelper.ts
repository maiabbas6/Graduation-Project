// src/core/api/cacheNetworkHelper.ts
import type { NetworkHelper } from './networkHelper';
import { AxiosNetworkHelper } from './axiosNetworkHelper';
import { AppResponse } from './appResponse';

interface CacheItem {
  fetchedAt: Date;
  response: AppResponse;
}

export class CacheNetworkHelper implements NetworkHelper {
  private static _instance: CacheNetworkHelper;
  private _networkHelper: NetworkHelper = AxiosNetworkHelper.getInstance(); 
  private _cache: Map<string, CacheItem> = new Map(); 
  private readonly cacheTime = 65000;

  private constructor() {}

  static getInstance(): CacheNetworkHelper {
    if (!CacheNetworkHelper._instance) {
      CacheNetworkHelper._instance = new CacheNetworkHelper();
    }
    return CacheNetworkHelper._instance;
  }

  private _cacheKey(url: string, params?: Record<string, string>): string {
    if (!params) return url;
    const sorted = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
    return `${url}?${sorted}`;
  }

  async get<T>(url: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<AppResponse<T>> {
    const key = this._cacheKey(url, params);
    if (this._cache.has(key)) { 
      const cached = this._cache.get(key)!;
      const isExpired = new Date().getTime() - cached.fetchedAt.getTime() > this.cacheTime; 
      if (!isExpired) {
        return cached.response as AppResponse<T>; 
      }
    }
    const response = await this._networkHelper.get<T>(url, params, headers); 
    this._cache.set(key, { fetchedAt: new Date(), response }); 
    return response;
  }

  async post<T>(url: string, body?: any, files?: Record<string, File>, headers?: Record<string, string>): Promise<AppResponse<T>> {
    this.reset(); 
    return this._networkHelper.post<T>(url, body, files, headers); 
  }

  async put<T>(url: string, body?: any, files?: Record<string, File>, headers?: Record<string, string>): Promise<AppResponse<T>> {
    this.reset(); 
    return this._networkHelper.put<T>(url, body, files, headers); 
  }

  async patch<T>(url: string, body?: any, headers?: Record<string, string>): Promise<AppResponse<T>> {
    this.reset();
    return this._networkHelper.patch<T>(url, body, headers);
  }

  async delete<T>(url: string, body?: any, headers?: Record<string, string>): Promise<AppResponse<T>> {
    this.reset(); 
    return this._networkHelper.delete<T>(url, body, headers); 
  }

  reset(): void {
    this._cache.clear(); 
  }
}

export const networkHelper: NetworkHelper = CacheNetworkHelper.getInstance();