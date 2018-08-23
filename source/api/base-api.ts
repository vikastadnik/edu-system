/**
 * Entry point for all HTTP requests + auth functions
 */
import Axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants';
import { IAuthToken } from '../interfaces';
import { API_URL_CONFIG } from '../constants/urls';

export class BaseAPI {
  public static AXIOS_INSTANCE: AxiosInstance = Axios.create({});
  public static readonly AUTH_HEADER: string = 'X-CSRF-Token';
  public static AUTH_TOKEN: { csrf: string, login: string, role: string } =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  public static setBaseURL(baseURL: string): void {
    this.AXIOS_INSTANCE.defaults.baseURL = baseURL;
    this.AXIOS_INSTANCE.defaults.withCredentials = true;
  }

  public static logIn(options: { login: string, password: string }): Promise<IAuthToken> {
    return BaseAPI.request({ url: API_URL_CONFIG.auth.login, method: 'POST', data: options })
      .then((response: AxiosResponse): IAuthToken => {
        if (!response.data['csrf']) {
          throw response;
        }

        BaseAPI.setAuthToken({
          csrf: response.data['csrf'],
          login: response.data['login'],
          role: response.data['role']
        });
        BaseAPI.configureAxiosInstance({ csrf: response.data['csrf'] });
        return response.data as IAuthToken;
      });
  }

  public static logOut(): Promise<void> {
    return BaseAPI.request({ url: API_URL_CONFIG.auth.login, method: 'DELETE' })
      .then(BaseAPI.deleteAuthToken)
      .catch(BaseAPI.deleteAuthToken);
  }

  public static request(options: AxiosRequestConfig): AxiosPromise {
    return BaseAPI.AXIOS_INSTANCE.request(options)
      .catch((e: AxiosError): AxiosResponse => {
        throw e;
      });
  }

  /**
   * Configure Axios instance with params like headers, base URL, etc.
   */
  private static configureAxiosInstance(options: { csrf: string }): void {
    BaseAPI.AXIOS_INSTANCE.defaults.headers = { [BaseAPI.AUTH_HEADER]: options.csrf };
  }

  private static setAuthToken(options: { csrf: string; login: string, role: string }): void {
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
