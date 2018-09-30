/**
 * Entry point for all group HTTP requests + auth functions
 */
import { BaseAPI } from './base-api';
import { IGroupDTO } from '../interfaces';
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

  public static async createGroup(options: IGroupDTO): Promise<AxiosResponse> {
    return BaseAPI.request({
      url: API_URL_CONFIG.group.getGroupsList,
      method: 'POST',
      data: options
    });
  }

  public static async updateGroup(options: IGroupDTO): Promise<AxiosResponse> {
    return BaseAPI.request({
      url: API_URL_CONFIG.group.getGroupsList,
      method: 'POST',
      data: options
    });
  }
}
