import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { SectionApiResponse, SectionModel, SectionsApiResponse, UpdateSectionPayload } from '../../../../core/models/SectionModel';

export class SectionsDataSource {
  async getSections(): Promise<SectionModel[]> {
    const response = await networkHelper.get<SectionsApiResponse>(ApiConst.sections);
    return response.data.data;
  }

  async updateSection(id: number, payload: UpdateSectionPayload): Promise<SectionModel> {
    const response = await networkHelper.put<SectionApiResponse>(ApiConst.sectionById(id), payload);
    return response.data.data;
  }
}

export const sectionsDataSource = new SectionsDataSource();