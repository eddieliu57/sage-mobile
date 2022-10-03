import {LoginScreenType} from './login';

export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE = 'SIGNUP_FAILURE',
  LOGGED_IN = 'LOGGED_IN',
  SEND_OTP_REQUEST = 'SEND_OTP_REQUEST',
  SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS',
  SEND_OTP_FAILURE = 'SEND_OTP_FAILURE',
  SAVE_USER_DATA = 'SAVE_USER_DATA',
  CLEAR_USER_DATA = 'CLEAR_USER_DATA',
  CLEAR_SIGNUP_DATA = 'CLEAR_SIGNUP_DATA',
}
export type loginData = {
  user: LoginScreenType;
};

export type loginAction = {
  type:
    | ActionTypes.LOGIN_REQUEST
    | ActionTypes.LOGIN_SUCCESS
    | ActionTypes.LOGIN_FAILURE
    | ActionTypes.SIGNUP_REQUEST
    | ActionTypes.SIGNUP_SUCCESS
    | ActionTypes.SIGNUP_FAILURE
    | ActionTypes.LOGGED_IN
    | ActionTypes.SEND_OTP_REQUEST
    | ActionTypes.SEND_OTP_SUCCESS
    | ActionTypes.SEND_OTP_FAILURE
    | ActionTypes.SAVE_USER_DATA
    | ActionTypes.CLEAR_USER_DATA
    | ActionTypes.CLEAR_SIGNUP_DATA
    | ActionTypes.LOGOUT;
  payload?: any;
};
