import {AppDispatch} from '../../types/dispatch';
import {ActionTypes} from '../../types/product/cartAction';
import * as Navigator from '../../navigation/RootNavigation';

export const addToCart = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: data,
    });

    Navigator.navigate('Cart');
  };
};

export const cartItems = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionTypes.CART_ITEMS,
      payload: data,
    });

    Navigator.navigate('Shipping');
  };
};
