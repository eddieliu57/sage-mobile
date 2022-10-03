import {ActionTypes} from '../../types/address/addressAction';
import {AppDispatch} from '../../types/dispatch';
// import * as Navigator from '../../navigation/RootNavigation';

export const addDefaultAddress = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionTypes.ADD_DEFAULT_ADDRESS,
      payload: data,
    });
  };
};
