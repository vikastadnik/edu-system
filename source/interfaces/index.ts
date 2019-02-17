import { RouteConfig } from 'react-router-config';
export * from './state';

export interface IToken {
  csrf: string;
  login: string;
  role: string;
}
export interface IAppRoute extends RouteConfig {
  readonly caption: string;
  readonly routes?: IAppRoute[];
}

export interface IGroupDTO {
  readonly id?: number;
  readonly name?: string;
  readonly faculty?: string;
  readonly course?: number;
}

export interface IStudentDTO {
  uuid: string;
  email: string;
  group: string;
  name: string;
  surname: string;
  ticket: string;
}
