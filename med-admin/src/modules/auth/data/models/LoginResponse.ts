import type { UserModel } from './UserModel';

export interface LoginResponse {
  token: string;
  user: UserModel;
}

export interface LoginApiResponse {
  data: LoginResponse;
  success: boolean;
  code: number;
  message: string;
}