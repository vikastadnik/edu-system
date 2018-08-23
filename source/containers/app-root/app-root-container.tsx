import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppRoot } from './app-root';
import { IAuthToken, IState } from '../../interfaces';

export interface IAppRootStateProps extends RouteComponentProps<{}> {
  readonly auth: IAuthToken;
}

export type IAppRootConnectProps = IAppRootStateProps & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState, props: RouteComponentProps<{}>): IAppRootStateProps {
  return { auth: state.auth, ...props };
}

export const AppRootContainer: React.ComponentClass
  = withRouter(ReactRedux.connect(mapStateToProps)(AppRoot));
