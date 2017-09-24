import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import tweets from './tweets'
import geoData from './geo'

const reducer = combineReducers({
    tweets,
    geoData
});


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
  )
);

export default store;
export * from './geo'
export * from './tweets'