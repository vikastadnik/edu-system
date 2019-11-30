import { ISubjectDTO } from '../interfaces';
import { BaseAPI } from './base-api';
import { AxiosResponse } from 'axios';

export class SubjectApi {
  public static async getSubjectList(): Promise<ISubjectDTO[]> {
    const subjectList: AxiosResponse = await BaseAPI.request({
      url: '/lessons',
      method: 'get'
    });

    return subjectList.data as ISubjectDTO[];
  }

  public static async createSubject(subject: ISubjectDTO): Promise<void> {
    await BaseAPI.request({
      url: '/lessons',
      method: 'post',
      data: subject
    });
  }
}
