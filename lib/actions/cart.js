import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/actionTypes';

/**
 * Create an action to add an item in the cart.
 *
 * @param {string} id - Item id.
 * @returns {Object} An action that consists in adding an item in the cart..
 */
export const doAddItemToCart = id => ({
  type: CART_ADD_ITEM,
  id,
});

/**
 * Create an action to remove an item from the cart.
 *
 * @param {string} id - Item id.
 * @returns {Object} An action that consists in removing an item from the cart.
 */
export const doRemoveItemFromCart = id => ({
  type: CART_REMOVE_ITEM,
  id,
});
