import { useSendData } from '../../../../core/hooks/useSendData';
import { authDataSource } from '../../data/data_source/AuthDataSource';
import type { LoginRequest } from '../../data/models/LoginRequest';
import type { LoginResponse } from '../../data/models/LoginResponse';

export function useAuthController() {
  const { state, sendData, isSubmitting } = useSendData<LoginResponse, LoginRequest>(
    (body) => authDataSource.postLogin(body),
    {
      withLoader: true,
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      },
    }
  );

  return { state, login: sendData, isSubmitting };
}