import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { IAuthToken, IState } from '../../interfaces';
import { AppLogin } from './app-login';

export interface IAppLoginProps {
  readonly auth: IAuthToken;
}

export type IAppLoginConnectedProps = IAppLoginProps & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState): IAppLoginProps {
  return { auth: state.auth };
}

export const AppLoginContainer: React.ComponentClass = ReactRedux.connect(mapStateToProps)(AppLogin);
