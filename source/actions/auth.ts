import * as Redux from 'redux';
import { IAuthToken } from '../interfaces';

export const SET_AUTH_TOKEN: string = 'SET_AUTH_TOKEN';
export const LOG_OUT: string = 'LOG_OUT';

export interface ISetAuthToken extends Redux.Action {
  readonly token: IAuthToken;
}

export type ILogOut = Redux.Action;

export function setAuthToken(token: IAuthToken): ISetAuthToken {
  return { type: SET_AUTH_TOKEN, token };
}

export function logOut(): ILogOut {
  return { type: LOG_OUT };
}
