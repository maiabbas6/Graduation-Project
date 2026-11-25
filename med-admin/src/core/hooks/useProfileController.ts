import { ApiConst } from '../const/ApiConst';
import { networkHelper } from '../network/cacheNetworkHelper';
import type { AdminProfileModel, ProfileApiResponse } from '../models/ProfileModel';
import { useLoadData } from './useLoadData';

export function useProfileController() {
  return useLoadData<AdminProfileModel>(async () => {
    const response = await networkHelper.get<ProfileApiResponse>(ApiConst.profile);
    return response.data.data;
  });
}