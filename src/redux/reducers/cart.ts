import {ActionTypes, cartAction} from '../../types/product/cartAction';

const initialState = {
  cart: [],
  items: null,
};

const cartReducer = (state = initialState, action: cartAction) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // const arr1 = state.cart.filter((x: any) => x._id === action.payload?._id);
      const arr1 = state.cart.includes(action.payload);
      console.log(
        'ACTION ',
        action.payload,
        ' -- ',
        state.cart,
        ' ----- ',
        arr1,
      );

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case ActionTypes.CART_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
