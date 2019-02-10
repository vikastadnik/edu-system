import { IGroupDTO } from './index';

export interface IState {
  readonly auth: IAuthToken;
  readonly groups: IGroups;
}

export interface IAuthToken {
  readonly csrf: string;
  readonly token: string;
  readonly login: string;
  readonly role: string;
}

export interface IGroups {
  readonly groupsList: IGroupDTO[];
  readonly selectedGroupID: number;
}

export interface IStudent {
  readonly id: string;
  readonly data: object;
}
