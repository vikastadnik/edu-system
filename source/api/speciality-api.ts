import { BaseAPI } from './base-api';
import { AxiosResponse } from 'axios';
import { ISpecialityDTO } from '../interfaces';
import { API_URL_CONFIG } from '../constants/urls';

export class SpecialityApi {
  public static async getSpecialitiesList(): Promise<ISpecialityDTO[]> {
    const specialityList: AxiosResponse = await BaseAPI.request({
      url: API_URL_CONFIG.speciality.getSpecialityList,
      method: 'GET'
    });

    return specialityList.data as ISpecialityDTO[];
  }

  public static async addSpeciality(options: { name: string }): Promise<ISpecialityDTO> {
    const speciality: AxiosResponse = await BaseAPI.request({
      url: API_URL_CONFIG.speciality.getSpecialityList,
      method: 'POST',
      data: options
    });
    return speciality.data as ISpecialityDTO;
  }

  public static async deleteSpeciality(options: { uuid: string }): Promise<void> {
    await BaseAPI.request({
      url: `${API_URL_CONFIG.speciality.getSpecialityList}/${options.uuid}`,
      method: 'DELETE'
    });
  }
}
