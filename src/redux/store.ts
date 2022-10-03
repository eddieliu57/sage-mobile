import {createStore, applyMiddleware} from 'redux';

// import {persistStore} from 'redux-persist';

import rootReducers from './reducers';
import thunk, {ThunkMiddleware} from 'redux-thunk';

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

const store = createStore(
  rootReducers,
  applyMiddleware(thunk as ThunkMiddleware),
);
// export const persistor = persistStore(store);

export default store;
