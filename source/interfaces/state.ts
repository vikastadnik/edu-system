import { IGroupDTO, ISpecialityDTO, ISubjectDTO, IUser } from './index';

export interface IState {
  readonly auth: IAuthToken;
  readonly groups: IGroups;
  readonly specialities: ISpecialities;
  readonly teachers: ITeachers;
  readonly subjects: ISubjects;
}

export interface IAuthToken {
  readonly csrf: string;
  readonly token: string;
  readonly login: string;
  readonly role: string;
}

export interface IGroups {
  readonly groupsList: IGroupDTO[];
  readonly selectedGroupID: string;
}

export interface IStudent {
  readonly id: string;
  readonly data: object;
}

export interface ITeachers {
  readonly list: IUser[];
  readonly fetching: boolean;
  readonly error: any;
}

export interface ISubjects {
  readonly list: ISubjectDTO[];
  readonly fetching: boolean;
  readonly error: any;
}

export interface ISpecialities {
  readonly list: ISpecialityDTO[];
  readonly fetching: boolean;
  readonly error: any;
}
