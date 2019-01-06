import { all } from 'redux-saga/effects';

/**
 * Create the root saga.
 *
 * @returns {Generator} The root saga.
 */
export default function* rootSaga() {
  yield all([]);
}
