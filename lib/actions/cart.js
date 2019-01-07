import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOAD,
  CART_SAVE,
} from '../constants/actionTypes';

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

/**
 * Create an action to load the cart.
 *
 * @returns {Object} An action that consists in loading the cart.
 */
export const doLoadCart = () => ({
  type: CART_LOAD,
});

/**
 * Create an action to save the cart.
 *
 * @returns {Object} An action that consists in saving the cart.
 */
export const doSaveCart = () => ({
  type: CART_SAVE,
});
