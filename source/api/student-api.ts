/**
 * Entry point for all  student HTTP requests + auth functions
 */
import { IStudentDTO } from '../interfaces';
import { AxiosResponse } from 'axios';
import { BaseAPI } from './base-api';
import { API_URL_CONFIG } from '../constants/urls';

export class StudentAPI {
  public static async createStudent(options: IStudentDTO): Promise<IStudentDTO> {
    const student: AxiosResponse = await BaseAPI.request({
      url: API_URL_CONFIG.student.createStudent,
      method: 'POST',
      data: options
    });

    return student.data as IStudentDTO;
  }
}
