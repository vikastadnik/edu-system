import * as Redux from 'redux';
import { IState } from '../interfaces';
import { auth } from './auth';

export const Main: Redux.Reducer<IState> = Redux.combineReducers({
  auth
});
