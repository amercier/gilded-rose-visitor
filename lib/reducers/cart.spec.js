import cartReducer from './cart';
import { doAddItemToCart, doRemoveItemFromCart } from '../actions/cart';

describe('cartReducer', () => {
  let prevState;

  beforeEach(() => {
    prevState = cartReducer();
  });

  describe('initial state', () => {
    it('sets cart to an empty array', () => {
      expect(prevState.cart).toEqual([]);
    });
  });

  describe('CART_ADD_ITEM', () => {
    it('adds id to cart', () => {
      const { cart } = cartReducer(prevState, doAddItemToCart('a'));
      expect(cart).toContain('a');
    });
  });

  describe('CART_REMOVE_ITEM', () => {
    it('removes id from cart', () => {
      const { cart } = cartReducer({ cart: ['a'] }, doRemoveItemFromCart('a'));
      expect(cart).not.toContain('a');
    });
  });
});
