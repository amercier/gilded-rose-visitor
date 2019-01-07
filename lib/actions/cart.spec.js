import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOAD,
  CART_SAVE,
} from '../constants/actionTypes';
import {
  doAddItemToCart,
  doRemoveItemFromCart,
  doLoadCart,
  doSaveCart,
} from './cart';

describe('doAddItemToCart', () => {
  it('returns a CART_ADD_ITEM action', () => {
    expect(doAddItemToCart().type).toBe(CART_ADD_ITEM);
  });

  it('provides the given error', () => {
    const ID = {};
    expect(doAddItemToCart(ID).id).toBe(ID);
  });
});

describe('doRemoveItemFromCart', () => {
  it('returns a CART_REMOVE_ITEM action', () => {
    expect(doRemoveItemFromCart().type).toBe(CART_REMOVE_ITEM);
  });

  it('provides the given error', () => {
    const ID = {};
    expect(doRemoveItemFromCart(ID).id).toBe(ID);
  });
});

describe('doLoadCart', () => {
  it('returns a CART_LOAD action', () => {
    expect(doLoadCart().type).toBe(CART_LOAD);
  });
});

describe('doSaveCart', () => {
  it('returns a CART_SAVE action', () => {
    expect(doSaveCart().type).toBe(CART_SAVE);
  });
});
