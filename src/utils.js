import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware = applyMiddleware(thunk);

export default (initialState, window) => {
  if (window) {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composeEnhancers(
      middleware,
    ));
  }
  return createStore(rootReducer, initialState, middleware);
};


export const mapBoxToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNmdrMGkxcjExYWMzZW52NDM1Ymhmc3AifQ.QNNipRYHGdZZ59WxtggPdA';
export const title = process.env.REACT_APP_APP_NAME;


export function dissoc(obj, prop) {
  const { [prop]: omit, ...res } = obj;
  return res;
}


export function groupByField(arr, field) {
  return arr?.reduce((acc, o) => ({ ...acc, [o[field]]: o }), {})
}

export function update(object, key, fn) {
  return { ...object, [key]: fn(object[key]) }
}
