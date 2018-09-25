import * as React from 'react';
import { Route } from 'react-router-dom';
import { IAppRootConnectProps } from './app-root-container';
import { AppLoginContainer } from '../app-login';
import { AppHeaderContainer } from '../app-header';

/**
 * Root component switches between "Login" and "Content" components
 */
export class AppRoot extends React.Component<IAppRootConnectProps> {
  constructor(props: IAppRootConnectProps) {
    super(props);
  }

  /** Show "Login" component if token is not set or has expired */
  public getLogInRoute(): JSX.Element {
    return <Route path="/" component={AppLoginContainer}/>;
  }

  /** Show "Home" component if token is valid */
  public getContentRoute(): JSX.Element {
    return (
      <React.Fragment>
        <AppHeaderContainer/>
        <h1>{'Logged!'}</h1>
      </React.Fragment>
    );
  }

  public render(): JSX.Element {
    return (this.props.auth.csrf)
      ? this.getContentRoute()
      : this.getLogInRoute();
  }
}
