import * as React from 'react';
import { Form, Grid, InputOnChangeData, Segment, SemanticWIDTHS } from 'semantic-ui-react';
import { autobind } from 'core-decorators';
import { IAppLoginConnectedProps as IProps } from './app-login-container';
import { AppHeaderContainer } from '../app-header';
import { AxiosError } from 'axios';
import { BaseAPI } from '../../api';
import { IAuthToken } from '../../interfaces';
import * as Actions from '../../actions';
import { ERROR_MESSAGES, LOG_IN_TEXT } from '../../constants';
import './app-login.less';
import { ErrorHandler } from '../../components/error-handler';

export class AppLogin extends React.Component<IProps, IState> {
  public readonly OFFSET_WIDTH: SemanticWIDTHS = 5;
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
  public async onLogin(): Promise<void> {
    try {
      this.setState({ loading: true });
      const token: IAuthToken = await BaseAPI.logIn({ login: this.state.login, password: this.state.password });
      this.setState({ loading: false });
      this.props.dispatch(Actions.Auth.setAuthToken(token));
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  public getLogInForm(): JSX.Element {
    const { loading, error, login, password } = this.state;
    let errorMessage: string = null;
    if (error && error.response) {
      errorMessage = error.response.data.message;
    } else if (error && !error.response) {
      errorMessage = ERROR_MESSAGES.SORRY_REQUEST_FAILED;
    }

    return (
      <Segment raised data-component="login-form" style={{ marginTop: '4rem' }}>
        <Form autoComplete="on" loading={loading}>
          <Form.Input
            label={LOG_IN_TEXT.USERNAME}
            value={login}
            onChange={this.onInputChange}
            name="login"
            type="text"
            autoComplete="username"
          />

          <Form.Input
            label={LOG_IN_TEXT.PASSWORD}
            value={password}
            onChange={this.onInputChange}
            name="password"
            type="password"
            autoComplete="password"
          />

          {this.getLogInButton()}
        </Form>
        <ErrorHandler error={errorMessage}/>
      </Segment>
    );
  }

  public getLogInButton(): JSX.Element {
    const disabled: boolean = !this.state.login || !this.state.password;
    return (
      <Form.Button
        content={LOG_IN_TEXT.LOG_IN}
        onClick={this.onLogin}
        disabled={disabled}
        primary
        fluid
      />
    );
  }

  public render(): JSX.Element {
    return (
      <>
        <AppHeaderContainer/>
        <Grid data-component="app-login">
          <Grid.Row columns={2}>
            <Grid.Column width={this.OFFSET_WIDTH}/>
            <Grid.Column width={this.CONTENT_WIDTH}>
              {this.getLogInForm()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export interface IState {
  readonly loading: boolean;
  readonly error: AxiosError;
  readonly login: string;
  readonly password: string;
}
