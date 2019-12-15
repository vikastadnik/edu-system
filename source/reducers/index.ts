import * as Redux from 'redux';
import { IState } from '../interfaces';
import { auth } from './auth';
import { groups } from './groups';
import { specialities } from './specialities';
import { teachers } from './teachers';
import { subjects } from './subjects';
import { students } from './students';

// @ts-ignore
export const Main: Redux.Reducer<IState> = Redux.combineReducers({
  auth, groups, specialities, teachers, subjects, students
});
