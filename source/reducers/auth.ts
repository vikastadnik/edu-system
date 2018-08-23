import * as Actions from '../actions';
import { IAuthToken } from '../interfaces/state';
import { ILogOut } from '../actions/auth';

export type ActionType = Actions.Auth.ISetAuthToken& ILogOut;
const initial: IAuthToken = { csrf: '', login: '', role: '' };

export function auth(state: IAuthToken = initial, action: ActionType): IAuthToken {
  switch (action.type) {
    case Actions.Auth.SET_AUTH_TOKEN:
      return { ...action.token };
    case Actions.Auth.LOG_OUT:
      return initial;
    default:
      return state;
  }
}
