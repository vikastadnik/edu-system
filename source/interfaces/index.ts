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
  readonly uuid?: string;
  readonly name?: string;
  readonly specialtyUuid?: string;
  readonly course?: number;
}

export interface IStudentDTO {
  availableLessons?: any[];
  uuid: string;
  email: string;
  group: string;
  name: string;
  surname: string;
  ticket: string;
}

export interface ISpecialityDTO {
  readonly uuid?: string;
  readonly name: string;
}

export interface ISubjectDTO {
  readonly uuid?: string;
  readonly name: string;
  readonly description: string;
  readonly imgUrl: string;
  readonly teacherUuid?: string;
  readonly cards?: ICardDTO[];
}

export interface IUser {
  readonly uuid?: string;
  readonly email: string;
  readonly login?: string;
  readonly name: string;
  readonly surname: string;
  readonly userRole?: string;
}

export interface ITeacher {
  user: IUser;
  uuid?: string;
}

export interface ICardDTO {
  readonly [key: string]: any;
  uuid?: string;
  readonly title: string;
  readonly type: 'TEST' | 'INFO' | null;
  readonly content: string;
  readonly firstPage: boolean;
  readonly parentUuid?: string;
  readonly parentType?: 'TEST' | 'INFO' | null;
  readonly nextUuid?: string;
  readonly nextType?: string;
}
