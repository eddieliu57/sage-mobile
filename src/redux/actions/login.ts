import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Navigator from '../../navigation/RootNavigation';
import {AppDispatch} from '../../types/dispatch';
import {LoginScreenType, SignupScreenType} from '../../types/login/login';
import {ActionTypes} from '../../types/login/loginaction';
import {api} from '../../utilities/api';

export const loginAction = (formData: LoginScreenType) => {
  return async (dispatch: AppDispatch) => {
    dispatch({type: ActionTypes.LOGIN_REQUEST});
    const sendData = convertLoginData(formData);
    const response = await api.post('auth/login', sendData);
    if (response.status === 200) {
      try {
        const jsonValue = response.data;
        AsyncStorage.setItem('id', jsonValue.user._id);
        AsyncStorage.setItem('token', jsonValue.user.token);
        // return setTimeout(() => {
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: response.data,
        });
        Navigator.navigate('HomeTab');
        // }, 5000);
      } catch (e) {
        dispatch({
          type: ActionTypes.LOGIN_FAILURE,
          payload: e,
        });
      }
    } else {
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: response.data,
      });
    }
  };
};

export const registerAction = (formData: SignupScreenType) => {
  return async (dispatch: AppDispatch) => {
    dispatch({type: ActionTypes.SIGNUP_REQUEST});
    const sendData = convertLoginData(formData);
    console.log('TEST DATA', sendData);
    const response = await api.post('auth/register', sendData);
    console.log('TEST RESPONSE', response.data);
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.SIGNUP_SUCCESS,
        payload: response.data,
      });
      return setTimeout(() => {
        Navigator.navigate('Login');
      }, 5000);
    } else {
      dispatch({
        type: ActionTypes.SIGNUP_FAILURE,
        payload: response.data,
      });
    }
  };
};
export const clearRegistrationState = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionTypes.CLEAR_SIGNUP_DATA,
      payload: '',
    });
  };
};

// export const checkOtp = async (formData: any) => {
//   const mainResp = await api.post('auth/checkMobileNoUniqueness', {
//     mobile_no: formData.mobileNo,
//   });
//   console.log(')+++> ', mainResp.data);

//   if (mainResp.status === 200) {
//     if (mainResp.data?.code === 1000) {
//       return true;
//     }
//     // setDoctorsList(response.data);
//   }
// };

export const sendOtp = (formData: any, login?: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch({type: ActionTypes.SEND_OTP_REQUEST});
    // const checkOtpData = await checkOtp(formData);
    // console.log('TEST DATA', checkOtpData);
    const otpData = {
      mobile_no: formData.mobileNo,
      country_code: formData.countryCode,
    };
    console.log('OTP DATA ', otpData);
    const response = await api.post('auth/sentOTP', otpData);
    console.log('RESPONSE', response.data);
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.SAVE_USER_DATA,
        payload: formData,
      });
      // return setTimeout(() => {
      dispatch({
        type: ActionTypes.SEND_OTP_SUCCESS,
        payload: response.data,
      });
      if (login) {
        Navigator.navigate('VerifyOtp', {login: true});
      } else {
        Navigator.navigate('VerifyOtp', {login: false});
      }
      // }, 1000);
    } else {
      dispatch({
        type: ActionTypes.SEND_OTP_FAILURE,
        payload: response.data,
      });

      dispatch({
        type: ActionTypes.CLEAR_USER_DATA,
        payload: '',
      });
    }
  };
};

export const loggedIn = () => {
  return async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token');
    dispatch({type: ActionTypes.LOGGED_IN, payload: token});
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({type: ActionTypes.LOGOUT, payload: ''});
  };
};

const convertLoginData = (data: any) => {
  const user = {user: {...data}};
  return user;
};
