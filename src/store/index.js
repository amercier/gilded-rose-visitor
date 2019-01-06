import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createCliLogger from 'redux-cli-logger';
import createSagaMiddleware from 'redux-saga';
import itemReducer from '../reducers/item';
import { doStartPollingItems, doFetchItems } from '../actions/item';
import rootSaga from '../sagas';

/**
 * Create the store.
 *
 * @returns {Redux.Store} A new store.
 */
export default function makeStore() {
  const saga = createSagaMiddleware();

  const store = createStore(
    itemReducer,
    undefined, // preloadedState - we don't need an initial state as we will run the root saga immediately
    applyMiddleware(
      ...(process.env.NODE_ENV === 'development'
        ? [process.browser ? createLogger() : createCliLogger({}), saga]
        : [saga]),
    ),
  );

  // Run the root saga (ie: start listening for actions)
  saga.run(rootSaga);

  // Start items polling on the browser, or 1 fetch if server-side
  store.dispatch(process.browser ? doStartPollingItems() : doFetchItems());

  return store;
}
