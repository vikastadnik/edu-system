import * as React from 'react';
import { AppHeaderContainer } from '../app-header';
import { IAppRoute } from '../../interfaces';
import { IAppContentConnectProps } from './app-content-container';
import { USER_ROLES } from '../../enums';
import { ADMIN_APP_ROUTES, TEACHER_APP_ROUTES } from '../../constants';
import { Route } from 'react-router';
import { Grid } from 'semantic-ui-react';

export class AppContent extends React.Component<IAppContentConnectProps> {
  constructor(props: IAppContentConnectProps) {
    super(props);
  }

  public getRoutes(root?: IAppRoute[]): JSX.Element[] {
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
    const routes: JSX.Element[] = [];
    for (let i: number = 0; i < root.length; i++) {
      const item: IAppRoute = root[i];
      const route: JSX.Element = (
        <Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          component={item.component}
        />
      );
      routes.push(route);

      if (item.routes && item.routes.length) {
        routes.push(...this.getRoutes(item.routes));
      }
    }
    return routes;
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <AppHeaderContainer
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        />
        <Grid data-component="app-content">
          <Grid.Row>
            <Grid.Column>
              {this.getRoutes()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
