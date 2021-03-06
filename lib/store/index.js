import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createCliLogger from 'redux-cli-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { doLoadCart } from '../actions/cart';

/**
 * Create the store.
 *
 * @param {Object} initialState - Initial state.
 * @returns {Redux.Store} A new store.
 */
function makeStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    if (process.browser) {
      middlewares.push(createLogger());
    } else if (process.env.REACT_APP_DEBUG) {
      middlewares.push(createCliLogger({}));
    }
  }
  middlewares.push(sagaMiddleware);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  // Expose runSagaTask, a function that runs the rootSaga
  // @see next-redux-saga documentation: https://github.com/bmealhouse/next-redux-saga
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  // Run the root saga initially (ie: start listening for actions)
  store.runSagaTask();

  // Load cart
  store.dispatch(doLoadCart());

  return store;
}

export default makeStore;
