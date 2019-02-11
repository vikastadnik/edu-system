/**
 * Entry point for all HTTP requests + auth functions
 */
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants';
import { IAuthToken, IToken } from '../interfaces';
import { API_URL_CONFIG } from '../constants/urls';

export class BaseAPI {
  public static AXIOS_INSTANCE: AxiosInstance = Axios.create({});
  public static readonly CSRF_HEADER: string = 'X-CSRF-Token';
  public static readonly AUTH_HEADER: string = 'X-AUTH-Token';
  public static AUTH_TOKEN: IToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  public static setBaseURL(baseURL: string): void {
    this.AXIOS_INSTANCE.defaults.baseURL = baseURL;
  }

  public static async logIn(options: { login: string, password: string }): Promise<IAuthToken> {
    const response: AxiosResponse = await BaseAPI.request({
      url: API_URL_CONFIG.auth.login,
      method: 'POST',
      data: options
    });

    if (!response.data['csrf']) {
      throw response;
    }
    BaseAPI.setAuthToken({
      csrf: response.data['csrf'],
      login: response.data['login'],
      role: response.data['role']
    });
    BaseAPI.configureAxiosInstance({csrf: response.data['csrf'], token: response.data['token']});
    return response.data as IAuthToken;
  }

  public static logOut(): Promise<void> {
    return BaseAPI.request({url: API_URL_CONFIG.auth.login, method: 'DELETE'})
      .then(BaseAPI.deleteAuthToken)
      .catch(BaseAPI.deleteAuthToken);
  }

  public static async request(options: AxiosRequestConfig): Promise<AxiosResponse> {
    return BaseAPI.AXIOS_INSTANCE.request(options)
      .catch((e: AxiosError): AxiosResponse => {
        throw e;
      });
  }

  /**
   * Configure Axios instance with params like headers, base URL, etc.
   */
  public static configureAxiosInstance(options: { csrf: string, token: string }): void {
    BaseAPI.AXIOS_INSTANCE.defaults.headers = {
      [BaseAPI.CSRF_HEADER]: options.csrf,
      [BaseAPI.AUTH_HEADER]: options.token
    };
  }

  private static setAuthToken(options: IToken): void {
    BaseAPI.AUTH_TOKEN.csrf = options.csrf;
    BaseAPI.AUTH_TOKEN.login = options.login;
    BaseAPI.AUTH_TOKEN.role = options.role;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BaseAPI.AUTH_TOKEN));
  }

  private static deleteAuthToken(): void {
    delete BaseAPI.AUTH_TOKEN.login;
    delete BaseAPI.AUTH_TOKEN.csrf;
    delete BaseAPI.AUTH_TOKEN.role;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BaseAPI.AUTH_TOKEN));
  }
}
