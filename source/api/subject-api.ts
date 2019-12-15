import { ICardDTO, ISubjectDTO } from '../interfaces';
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

  public static async createSubject(subject: ISubjectDTO): Promise<ISubjectDTO> {
    const r = await BaseAPI.request({
      url: '/lessons',
      method: 'post',
      data: subject
    });

    return r.data as ISubjectDTO;
  }

  public static async getSubjectByID(subjectID: string): Promise<ISubjectDTO> {
    const rSubject: AxiosResponse = await BaseAPI.request({
      url: `/lessons/${subjectID}`,
      method: 'get'
    });

    const rCards: AxiosResponse = await BaseAPI.request({
      url: '/cards',
      method: 'get',
      params: { lesson_uuid: subjectID }
    });

    return { ...rSubject.data, cards: rCards.data };
  }

  public static async createInfoCard(data): Promise<ICardDTO> {
    const response: AxiosResponse = await BaseAPI.request({
      url: `/cards/info`,
      method: 'post',
      data
    });

    return response.data as ICardDTO;
  }

  public static async getInfoCard(uuid): Promise<ICardDTO> {
    const response: AxiosResponse = await BaseAPI.request({
      url: `/cards/info/${uuid}`,
      method: 'get',
    });

    return response.data as ICardDTO;
  }
}
