import * as React from 'react';
import { Route } from 'react-router-dom';
import { IAppRootConnectProps } from './app-root-container';
import { AppLoginContainer } from '../app-login';
import { AppContentContainer } from '../app-content';
import { LOCAL_STORAGE_KEY } from '../../constants';
import * as Actions from '../../actions';
import { IAuthToken } from '../../interfaces';
import { BaseAPI } from '../../api';

/**
 * Root component switches between "Login" and "Content" components
 */
export class AppRoot extends React.Component<IAppRootConnectProps> {
  constructor(props: IAppRootConnectProps) {
    super(props);
  }

  public componentDidMount(): void {
    const authToken: IAuthToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (authToken) {
      this.props.dispatch(Actions.Auth.setAuthToken(authToken));
      BaseAPI.configureAxiosInstance({csrf: authToken.csrf});
    }
  }

  /** Show "Login" component if token is not set or has expired */
  public getLogInRoute(): JSX.Element {
    return <Route path="/" component={AppLoginContainer}/>;
  }

  /** Show "Home" component if token is valid */
  public getContentRoute(): JSX.Element {
    return <Route path="/" component={AppContentContainer}/>;
  }

  public render(): JSX.Element {
    return (this.props.auth.csrf)
      ? this.getContentRoute()
      : this.getLogInRoute();
  }
}
