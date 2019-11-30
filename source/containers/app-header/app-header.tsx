import * as React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { IAppHeaderConnectProps } from './app-header-container';
import { BaseAPI } from '../../api';
import { IAppRoute } from '../../interfaces';
import { ADMIN_APP_ROUTES, COMMON_VIEW_TEXT, LOG_IN_TEXT, TEACHER_APP_ROUTES } from '../../constants';
import * as Actions from '../../actions';
import './app-header.less';
import { autobind } from 'core-decorators';
import { USER_ROLES } from '../../enums';

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
  public getNavLinks(root?: IAppRoute[], nested: boolean = false): JSX.Element[] {
    if (!this.props.auth.csrf) {
      return null;
    }

    if (!root) {
      switch (this.props.auth.role) {
        case USER_ROLES.ADMIN:
          root = ADMIN_APP_ROUTES;
          break;
        case USER_ROLES.TEACHER:
          root = TEACHER_APP_ROUTES;
          break;
        default:
          root = [];
          break;
      }
    }
    const links: JSX.Element[] = root.map((route: IAppRoute, index: number): JSX.Element => {
      /* Links without children are rendered as top-level links */
      const navLink: JSX.Element = (
        <NavLink key={route.path} to={route.path} exact>
          {route.caption}
        </NavLink>
      );

      return <Dropdown.Item key={index} content={navLink}/>;
    });

    return links;
  }

  public getAuthInfo(): JSX.Element {
    if (!this.props.auth.csrf) {
      return null;
    }

    return (
      <Menu.Menu position="right">
        <Menu.Item content={this.props.auth.login}/>
        <Menu.Item content={LOG_IN_TEXT.LOG_OUT} onClick={this.onLogOut}/>
      </Menu.Menu>
    );
  }

  public render(): JSX.Element {
    return (
      <Menu data-component="app-header">
        <Menu.Item content={COMMON_VIEW_TEXT.TITLE} header/>
        {this.getNavLinks()}
        {this.getAuthInfo()}
      </Menu>
    );
  }
}
