export interface IState {
  readonly auth: IAuthToken;
}

export interface IAuthToken {
  readonly csrf: string;
  readonly token: string;
  readonly login: string;
  readonly role: string;
}
