import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/actionTypes';

const INITIAL_STATE = {
  cart: [],
};

/**
 * Cart reducer.
 *
 * @param {Object} [state=INITIAL_STATE] - Previous state.
 * @param {string} [action={}] - Action type and data.
 * @returns {Object} Next state.
 */
function itemReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      if (state.cart.indexOf(action.id) !== -1) {
        throw new Error(`Item ${action.id} is already in the cart!`);
      }
      return { ...state, cart: [...state.cart, action.id] };
    }
    case CART_REMOVE_ITEM: {
      const index = state.cart.indexOf(action.id);
      if (index === -1) {
        throw new Error(`Item ${action.id} is not in the cart!`);
      }
      const cart = [...state.cart];
      cart.splice(index, 1);
      return { ...state, cart };
    }
    default:
      return state;
  }
}

export default itemReducer;
