import { ITeacher, IUser } from '../interfaces';
import { BaseAPI } from './base-api';
import { AxiosResponse } from 'axios';

export class TeacherApi {
  public static async getTeacherList(): Promise<IUser[]> {
    const teacherList: AxiosResponse = await BaseAPI.request({
      url: '/teachers',
      method: 'get'
    });

    return teacherList.data.map((t: ITeacher) => ({ ...t?.user, uuid: t.uuid }));
  }

  public static async createTeacher(teacher: IUser): Promise<IUser> {
    const reps: AxiosResponse = await BaseAPI.request({
      url: '/teachers',
      method: 'post',
      data: teacher
    });
    return reps.data.user as IUser;
  }

  public static async deleteTeacher(uuid: string): Promise<void> {
    await BaseAPI.request({
      url: `/teachers/${uuid}`,
      method: 'delete',
    });
  }
}
