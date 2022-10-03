import {ActionTypes, loginAction} from '../../types/login/loginaction';
import {LoginReducerType} from '../../types/login/loginreducer';

const initialState: LoginReducerType = {
  isLoading: false,
  user: {_id: '', email: '', token: '', username: ''},
  token: null,
  userRegisterData: null,
  otpData: null,
  signupError: '',
  userCreated: false,
};

const loginReducer = (state = initialState, action: loginAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        userCreated: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCreated: false,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        userCreated: false,
      };
    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        userCreated: false,
        signupError: '',
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCreated: true,
        signupError: '',
      };
    case ActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        userCreated: false,
        signupError: action.payload,
      };
    case ActionTypes.LOGGED_IN:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoading: false,
        token: null,
      };

    case ActionTypes.SEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpData: action.payload,
      };
    case ActionTypes.SEND_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        otpData: null,
      };

    case ActionTypes.SAVE_USER_DATA:
      return {
        ...state,
        isLoading: false,
        userRegisterData: action.payload,
      };

    case ActionTypes.CLEAR_USER_DATA:
      return {
        ...state,
        isLoading: false,
        userRegisterData: null,
      };

    case ActionTypes.CLEAR_SIGNUP_DATA:
      return {
        ...state,
        isLoading: false,
        userCreated: false,
        signupError: '',
      };

    default:
      return state;
  }
};

export default loginReducer;
