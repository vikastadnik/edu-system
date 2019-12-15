import * as React from 'react';
import { AppHeaderContainer } from '../app-header';
import { IAppRoute } from '../../interfaces';
import { IAppContentConnectProps } from './app-content-container';
import { USER_ROLES } from '../../enums';
import {
  ADD_INFO_CARD,
  ADMIN_APP_ROUTES,
  LOOK_INFO_CARD,
  SUBJECT,
  TEACHER_APP_ROUTES
} from '../../constants';
import Subject from '../../components/subjects/subject/subject';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import './app-content.less';
import AddSubject from '../../components/subjects/add-subject-modal';
import AddInfoCard from '../../components/subjects/add-info-card';
import InfoCard from '../../components/subjects/info-card';

export class AppContent extends React.Component<IAppContentConnectProps> {

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
          component={item.component}
          key={item.path}
          path={item.path}
          exact={item.exact}
        />
      );
      routes.push(route);
    }
    return routes;
  }

  public render(): JSX.Element {
    return (
      <>
        <AppHeaderContainer
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        />
        <Grid data-component="app-content">
          <Grid.Row>
            <Grid.Column>
              {this.getRoutes()}
              <Route exact path={'/create-subject'} component={AddSubject}/>
              <Route exact path={SUBJECT} component={Subject}/>
              <Route exact path={ADD_INFO_CARD} component={AddInfoCard}/>
              <Route exact path={LOOK_INFO_CARD} component={InfoCard}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
