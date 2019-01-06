import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/actionTypes';
import { doAddItemToCart, doRemoveItemFromCart } from './cart';

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
