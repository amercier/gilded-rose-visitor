import {
  ITEMS_FETCH,
  ITEMS_FETCH_ERROR,
  ITEMS_SET,
  ITEM_FETCH,
  ITEM_FETCH_ERROR,
  ITEM_SET,
} from '../constants/actionTypes';

/**
 * Create an action to fetch items.
 *
 * @returns {Object} An action that consists in fetching items.
 */
export const doFetchItems = () => ({
  type: ITEMS_FETCH,
});

/**
 * Create an action to handle an items fetch error.
 *
 * @param {Error} error - Error thrown during fetch.
 * @returns {Object} An action that consists in hnadling items fetch error.
 */
export const doFetchItemsError = error => ({
  type: ITEMS_FETCH_ERROR,
  error,
});

/**
 * Create an action to add items.
 *
 * @param {Item[]} items - Items to add.
 * @returns {Object} An action that consists in adding the given items.
 */
export const doSetItems = items => ({
  type: ITEMS_SET,
  items,
});

/**
 * Create an action to fetch an item's details.
 *
 * @param {string} id - The item id.
 * @returns {Object} An action that consists in fetching items.
 */
export const doFetchItem = id => ({
  type: ITEM_FETCH,
  id,
});

/**
 * Create an action to handle an items fetch error.
 *
 * @param {Error} error - Error thrown during fetch.
 * @returns {Object} An action that consists in hnadling items fetch error.
 */
export const doFetchItemError = error => ({
  type: ITEM_FETCH_ERROR,
  error,
});

/**
 * Create an action to add items.
 *
 * @param {Item} item - Items to add.
 * @returns {Object} An action that consists in adding the given item.
 */
export const doSetItem = item => ({
  type: ITEM_SET,
  item,
});
