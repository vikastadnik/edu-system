import * as Redux from 'redux';
import { IState } from '../interfaces';
import { auth } from './auth';
import { group } from './group';

export const Main: Redux.Reducer<IState> = Redux.combineReducers({
  auth, group
});
