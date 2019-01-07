import { all } from 'redux-saga/effects';
import itemSaga from './item';
import cartSaga from './cart';

/**
 * Create the root saga.
 *
 * @returns {Generator} The root saga.
 */
export default function* rootSaga() {
  yield all([itemSaga(), cartSaga()]);
}
