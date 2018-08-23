import * as React from 'react';
import { Form, Grid, InputOnChangeData, Loader, Segment, SemanticWIDTHS } from 'semantic-ui-react';
import { autobind } from 'core-decorators';
import { IAppLoginConnectedProps as IProps } from './app-login-container';
import { AppHeaderContainer } from '../app-header';
import { AxiosError } from 'axios';
import { BaseAPI } from '../../api';
import { IAuthToken } from '../../interfaces';
import * as Actions from '../../actions';
import { LOG_IN_TEXT, COMMON_VIEW_TEXT } from '../../constants';
import './app-login.less';

export class AppLogin extends React.Component<IProps, IState> {
  public readonly OFFSET_WIDTH: SemanticWIDTHS = 1;
  public readonly CONTENT_WIDTH: SemanticWIDTHS = 5;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      login: '',
      password: ''
    };
  }

  @autobind
  public onInputChange(e: object, change: InputOnChangeData): void {
    const state: object = { [change.name]: change.value };
    this.setState(state);
  }

  @autobind
  public onLogin(): void {
    this.setState({ loading: true });

    BaseAPI.logIn({ login: this.state.login, password: this.state.password })
      .then((token: IAuthToken): void => {
        this.setState({ loading: false });
        this.props.dispatch(Actions.Auth.setAuthToken(token));
      })
      .catch((error: AxiosError): void => {
        this.setState({ loading: false, error });
      });
  }

  public getLogInForm(): JSX.Element {
    return (
      <Segment raised data-component="login-form">
        <Form autoComplete="on">
          <Form.Input
            label={LOG_IN_TEXT.USERNAME}
            value={this.state.login}
            onChange={this.onInputChange}
            name="login"
            type="text"
            autoComplete="username"
          />

          <Form.Input
            label={LOG_IN_TEXT.PASSWORD}
            value={this.state.password}
            onChange={this.onInputChange}
            name="password"
            type="password"
            autoComplete="password"
          />

          {this.getLogInButton()}
        </Form>
      </Segment>
    );
  }

  public getLogInButton(): JSX.Element {
    return (
      <Form.Button
        content={LOG_IN_TEXT.LOG_IN}
        onClick={this.onLogin}
        loading={this.state.loading}
        disabled={this.state.loading}
        primary
        fluid
      />
    );
  }

  public render(): JSX.Element {
    const loader: JSX.Element = (
      <Grid.Row columns="equal">
        <Grid.Column>
          <Loader content={COMMON_VIEW_TEXT.LOADING} active inline="centered"/>
        </Grid.Column>
      </Grid.Row>
    );

    const content: JSX.Element = (
      <Grid.Row columns={2}>
        <Grid.Column width={this.OFFSET_WIDTH}/>
        <Grid.Column width={this.CONTENT_WIDTH}>
          {this.getLogInForm()}
        </Grid.Column>
      </Grid.Row>
    );

    return (
      <React.Fragment>
        <AppHeaderContainer/>

        <Grid data-component="app-login">
          {this.state.loading ? loader : content}
        </Grid>
      </React.Fragment>
    );
  }
}

export interface IState {
  readonly loading: boolean;
  readonly error: AxiosError;
  readonly login: string;
  readonly password: string;
}
