import { RouteConfig } from 'react-router-config';
export * from './state';

export interface IAppRoute extends RouteConfig {
  readonly caption: string;
  readonly  path: string;
  readonly  exact: boolean;
  readonly routes?: IAppRoute[];
}
