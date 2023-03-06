import { applyMiddleware, createStore, compose } from 'redux';
// import thunkMiddleware from "redux-thunk";

import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from '@redux-devtools/extension';
// import { createLogger } from 'redux-logger';

import RootReducer from './reducers/RootReducer';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(RootReducer, preloadedState, composedEnhancers);

  return store;
}
