// src/core/api/axiosNetworkHelper.ts
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { NetworkHelper } from './networkHelper';
import { AppResponse } from './appResponse';

export class AxiosNetworkHelper implements NetworkHelper {
  private static _instance: AxiosNetworkHelper;
  private _axios: AxiosInstance;

  private constructor() {
    this._axios = axios.create({
      timeout: 10000,
    });

    this._axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      const lang = localStorage.getItem('language') || 'ar';

      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
      config.headers['Accept'] = 'application/json';
      config.headers['language'] = lang;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  static getInstance(): AxiosNetworkHelper {
    if (!AxiosNetworkHelper._instance) {
      AxiosNetworkHelper._instance = new AxiosNetworkHelper();
    }
    return AxiosNetworkHelper._instance;
  }

  private _handleError(error: AxiosError, callback: () => Promise<any>): Promise<any> {
    if (error.response) {
      if (error.response.status === 401) {
        return this._refreshToken(callback);
      }

      if (import.meta.env.DEV) {
        console.error('API Error:', error.response.status, error.config?.method, error.config?.url, error.response.data);
      }

      const data = error.response.data as Record<string, unknown> | undefined;
      if (data && typeof data.message === 'string' && data.message !== '') {
        throw new Error(data.message);
      }

      throw new Error(`Server Error (${error.response.status})`);
    }

    if (import.meta.env.DEV) {
      console.error('API Connection Error:', error);
    }
    throw new Error('Connection Error');
  }

  private async _refreshToken(callback: () => Promise<any>): Promise<any> {
    return callback();
  }

  async get<T>(url: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<AppResponse<T>> {
    try {
      const response = await this._axios.get(url, { params, headers });
      return new AppResponse({ data: response.data, statusCode: response.status, headers: response.headers });
    } catch (e) {
      return this._handleError(e as AxiosError, () => this.get(url, params, headers));
    }
  }

  private static _appendFiles(formData: FormData, files: Record<string, File | File[]>): void {
    Object.entries(files).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });
  }

  async post<T>(url: string, body?: any, files?: Record<string, File | File[]>, headers?: Record<string, string>): Promise<AppResponse<T>> {
    try {
      let data = body;
      if (files) {
        const formData = new FormData();
        if (body) {
          Object.keys(body).forEach(key => formData.append(key, body[key]));
        }
        AxiosNetworkHelper._appendFiles(formData, files);
        data = formData;
      }
      const response = await this._axios.post(url, data, { headers });
      return new AppResponse({ data: response.data, statusCode: response.status, headers: response.headers });
    } catch (e) {
      return this._handleError(e as AxiosError, () => this.post(url, body, files, headers));
    }
  }

  async put<T>(url: string, body?: any, files?: Record<string, File | File[]>, headers?: Record<string, string>): Promise<AppResponse<T>> {
    try {
      let data = body;
      if (files) {
        const formData = new FormData();
        if (body) {
          Object.keys(body).forEach(key => formData.append(key, body[key]));
        }
        AxiosNetworkHelper._appendFiles(formData, files);
        data = formData;
      }
      const response = await this._axios.put(url, data, { headers });
      return new AppResponse({ data: response.data, statusCode: response.status, headers: response.headers });
    } catch (e) {
      return this._handleError(e as AxiosError, () => this.put(url, body, files, headers));
    }
  }
  async patch<T>(url: string, body?: any, headers?: Record<string, string>): Promise<AppResponse<T>> {
    try {
      const response = await this._axios.patch(url, body, { headers });
      return new AppResponse({ data: response.data, statusCode: response.status, headers: response.headers });
    } catch (e) {
      return this._handleError(e as AxiosError, () => this.patch(url, body, headers));
    }
  }

  async delete<T>(url: string, body?: any, headers?: Record<string, string>): Promise<AppResponse<T>> {
    try {
      const response = await this._axios.delete(url, { data: body, headers });
      return new AppResponse({ data: response.data, statusCode: response.status, headers: response.headers });
    } catch (e) {
      return this._handleError(e as AxiosError, () => this.delete(url, body, headers));
    }
  }
}