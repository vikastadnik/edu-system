import * as React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { IAppHeaderConnectProps } from './app-header-container';
import { BaseAPI } from '../../api';
import { IAppRoute } from '../../interfaces';
import { APP_ROUTES, COMMON_VIEW_TEXT, LOG_IN_TEXT } from '../../constants';
import * as Actions from '../../actions';
import './app-header.less';
import { autobind } from 'core-decorators';

/**
 * App header contains navigation links based on APPLICATION_ROUTES constant
 */
export class AppHeader extends React.Component<IAppHeaderConnectProps> {
  constructor(props: IAppHeaderConnectProps) {
    super(props);
  }

  @autobind
  public onLogOut(): void {
    const callback: () => void = (): void => {
      this.props.dispatch(Actions.Auth.logOut());
      this.props.history.push('/');
    };

    BaseAPI.logOut().then(callback).catch(callback);
  }

  /** Generate header navigation links based on APPLICATION_ROUTES constant */
  public getNavLinks(root: IAppRoute[] = APP_ROUTES, nested: boolean = false): JSX.Element[] {
    if (!this.props.auth.csrf) { return null; }

    const links: JSX.Element[] = root.map((route: IAppRoute, index: number): JSX.Element => {
      if (route.routes) {
        return (
          <Dropdown key={index} item text={route.caption}>
            <Dropdown.Menu>
              {this.getNavLinks(route.routes, true)}
            </Dropdown.Menu>
          </Dropdown>
        );
      }

      /* Links without children are rendered as top-level links */
      const navLink: JSX.Element = (
        <NavLink key={route.path} to={route.path} exact>
          {route.caption}
        </NavLink>
      );

      const link: JSX.Element = (nested)
        ? <Dropdown.Item key={index} content={navLink} />
        : <Menu.Item key={index} content={navLink} />;

      return link;
    });

    return links;
  }

  public getAuthInfo(): JSX.Element {
    if (!this.props.auth.csrf) { return null; }

    return (
      <Menu.Menu position="right">
        <Menu.Item content={this.props.auth.login} />
        <Menu.Item content={LOG_IN_TEXT.LOG_OUT} onClick={this.onLogOut} />
      </Menu.Menu>
    );
  }

  public render(): JSX.Element {
    return (
      <Menu data-component="app-header">
        <Menu.Item content={COMMON_VIEW_TEXT.TITLE} header />
        {this.getNavLinks()}
        {this.getAuthInfo()}
      </Menu>
    );
  }
}
