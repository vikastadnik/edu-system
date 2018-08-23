import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { AppHeader } from './app-header';
import { IAuthToken, IState } from '../../interfaces';

export type IAppHeaderProps = Partial<RouteConfigComponentProps<{}>>;

export interface IAppHeaderStateProps extends IAppHeaderProps {
  readonly auth: IAuthToken;
}

export type IAppHeaderConnectProps = IAppHeaderStateProps & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState, props: IAppHeaderProps): IAppHeaderStateProps {
  return { auth: state.auth, ...props };
}

export const AppHeaderContainer: React.ComponentClass<IAppHeaderProps>
  = ReactRedux.connect(mapStateToProps)(AppHeader);
