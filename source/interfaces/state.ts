import { ICardDTO, IGroupDTO, ISpecialityDTO, IStudentDTO, ISubjectDTO, IUser } from './index';

export interface IState {
  readonly auth: IAuthToken;
  readonly groups: IGroups;
  readonly specialities: ISpecialities;
  readonly teachers: ITeachers;
  readonly subjects: ISubjects;
  readonly students: IStudents;
}

export interface IAuthToken {
  readonly csrf: string;
  readonly token: string;
  readonly login: string;
  readonly role: string;
}

export interface IGroups {
  readonly list: IGroupDTO[];
  readonly fetching: boolean;
  readonly error: any;
  readonly selectedUuid: string;
  readonly studentList: IStudentDTO[];
}

export interface IStudents {
  readonly list: IStudentDTO[];
  readonly fetching: boolean;
  readonly error: any;
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
  readonly currentSubject: ISubjectDTO;
  readonly currentCard: ICardDTO;
}

export interface ISpecialities {
  readonly list: ISpecialityDTO[];
  readonly fetching: boolean;
  readonly error: any;
}
