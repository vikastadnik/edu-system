import { IGroupDTO } from './index';

export interface IState {
  readonly auth: IAuthToken;
  readonly group: IGroup;
}

export interface IAuthToken {
  readonly csrf: string;
  readonly token: string;
  readonly login: string;
  readonly role: string;
}

export interface IGroup {
  readonly id: number;
  readonly data: IGroupDTO;
  readonly students: IStudent[];
  readonly selectedStudentID: string;

  readonly loading: boolean;
}

export interface IStudent {
  readonly id: string;
  readonly data: object;
}
