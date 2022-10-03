import {combineReducers} from 'redux';
import addressReducer from './address';
import cartReducer from './cart';
import loginReducer from './login';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistReducer} from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

const rootReducers = combineReducers({
  login: loginReducer,
  cart: cartReducer,
  address: addressReducer,
  //   auth: persistReducer(persistConfig, authReducer),
});

export default rootReducers;
