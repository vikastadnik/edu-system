import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { AppContent } from './app-content';
import { IAuthToken, IState } from '../../interfaces';

export type IAppContentProps = Partial<RouteConfigComponentProps<{}>>;

export interface IAppContentStateProps extends IAppContentProps {
  readonly auth: IAuthToken;
}

export type IAppContentConnectProps =
  IAppContentStateProps
  & Partial<RouteConfigComponentProps<{}>>
  & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState, props: IAppContentProps): IAppContentStateProps {
  return {auth: state.auth, ...props};
}

export const AppContentContainer: React.ComponentClass<IAppContentProps> =
  ReactRedux.connect(mapStateToProps)(AppContent);
