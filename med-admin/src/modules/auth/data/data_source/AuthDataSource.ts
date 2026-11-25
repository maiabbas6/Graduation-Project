import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { LoginRequest } from '../models/LoginRequest';
import type { LoginApiResponse, LoginResponse } from '../models/LoginResponse';

export class AuthDataSource {
  async postLogin(body: LoginRequest): Promise<LoginResponse> {
    const response = await networkHelper.post<LoginApiResponse>(ApiConst.login, body);
    return response.data.data;
  }
}

export const authDataSource = new AuthDataSource();