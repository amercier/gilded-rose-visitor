import { localStorage } from 'window-or-global';
import { all, put, takeEvery, select, call } from 'redux-saga/effects';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOAD,
  CART_SAVE,
} from '../constants/actionTypes';
import { doAddItemToCart } from '../actions/cart';

/**
 * Load state from local storage.
 *
 * @param {LocalStorage} storage - Storage to use.
 * @returns {string[]} The list of items loaded from local storage.
 */
function loadCart(storage = localStorage) {
  const serializedCart = storage && storage.getItem('cart');
  return serializedCart && JSON.parse(serializedCart);
}

/**
 * State state to local storage.
 *
 * @param {string[]} cart - The list of items to save.
 * @param {LocalStorage} storage - Storage to use.
 * @returns {void} Nothing.
 */
export const saveCart = (cart, storage = localStorage) => {
  if (storage) {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  }
};

/**
 * Load cart from local storage and generate one CART_ADD_ITEM action per item.
 *
 * @returns {Generator} A generator.
 */
function* handleLoadCart() {
  const debug = process.env.REACT_APP_DEBUG;
  if (debug) {
    console.log(`Loading cart from local storage`); // eslint-disable-line no-console
  }
  const itemIds = yield call(loadCart) || [];
  if (debug) {
    console.log(`Found ${itemIds.length} items in cart`); // eslint-disable-line no-console
  }

  const { cart } = yield select(({ cartReducer }) => cartReducer);
  yield* itemIds
    .filter(id => cart.indexOf(id) === -1)
    .map(id => put(doAddItemToCart(id)));
}

/**
 * Load cart from local storage and generate one.
 *
 * @returns {Generator} A generator.
 */
function* handleSaveCart() {
  const debug = process.env.REACT_APP_DEBUG;
  if (debug) {
    console.log(`Saving cart to local storage`); // eslint-disable-line no-console
  }
  const { cart } = yield select(({ cartReducer }) => cartReducer);
  yield call(saveCart, cart);

  if (debug) {
    console.log(`Saved ${cart.length} items to cart`); // eslint-disable-line no-console
  }
}

/**
 * Cart saga.
 *
 * @returns {Generator} The cart saga.
 */
export default function* cartSaga() {
  if (process.browser) {
    yield all([
      takeEvery(CART_LOAD, handleLoadCart),
      takeEvery(CART_SAVE, handleSaveCart),
      takeEvery(CART_ADD_ITEM, handleSaveCart),
      takeEvery(CART_REMOVE_ITEM, handleSaveCart),
    ]);
  }
}
