/**
 * Entry point for all group HTTP requests + auth functions
 */
import { BaseAPI } from './base-api';
import { IGroupDTO, IStudentDTO } from '../interfaces';
import { API_URL_CONFIG } from '../constants/urls';
import { AxiosResponse } from 'axios';

export class GroupApi {
  public static async getGroupsList(): Promise<IGroupDTO[]> {
    const groupList: AxiosResponse = await BaseAPI.request({
      url: API_URL_CONFIG.group.getGroupsList,
      method: 'GET'
    });

    return groupList.data as IGroupDTO[];
  }

  public static async getGroupStudentList(uuid: string): Promise<IStudentDTO[]> {
    const response: AxiosResponse = await BaseAPI.request({
      url: `/students/groups/${uuid}`,
      method: 'GET'
    });

    return response.data as IStudentDTO[];
  }

  public static async createGroup(options: IGroupDTO): Promise<IGroupDTO> {
    const response: AxiosResponse = await BaseAPI.request({
      url: API_URL_CONFIG.group.getGroupsList,
      method: 'POST',
      data: options
    });

    return response.data as IGroupDTO;
  }

  public static async updateGroup(options: IGroupDTO): Promise<AxiosResponse> {
    return BaseAPI.request({
      url: API_URL_CONFIG.group.getGroupsList,
      method: 'POST',
      data: options
    });
  }

  public static async deleteGroup(uuid: string): Promise<AxiosResponse> {
    return BaseAPI.request({
      url: `${API_URL_CONFIG.group.getGroupsList}/${uuid}`,
      method: 'DELETE',
    });
  }
}
