import {ActionTypes, addressAction} from '../../types/address/addressAction';

const initialState = {
  address: null,
};

const addressReducer = (state = initialState, action: addressAction) => {
  switch (action.type) {
    case ActionTypes.ADD_DEFAULT_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
