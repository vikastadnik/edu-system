import { RouteConfig } from 'react-router-config';
export * from './state';

export interface IToken {
  csrf: string;
  token: string;
  login: string;
  role: string;
}
export interface IAppRoute extends RouteConfig {
  readonly caption: string;
  readonly routes?: IAppRoute[];
}

export interface IGroupDTO {
  readonly id?: string;
  readonly name?: string;
}
