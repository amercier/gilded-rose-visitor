import fetch from 'isomorphic-unfetch';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import {
  doFetchItemsError,
  doSetItems,
  doFetchItemError,
  doSetItem,
} from '../actions/item';
import { doRemoveItemFromCart } from '../actions/cart';
import { API_URL_ITEMS, API_URL_ITEM } from '../constants/api';
import { ITEMS_FETCH, ITEM_FETCH } from '../constants/actionTypes';

const ITEM_TYPES = {
  LEGENDARY: 'LEGENDARY',
  STANDARD: 'STANDARD',
  BACKSTAGE_PASS: 'BACKSTAGE_PASS',
  CONJURED: 'CONJURED',
};

/**
 * @typedef Item
 *
 * Item.
 *
 * @type {Object}
 * @property {string} id - Item unique identifier.
 * @property {string} name - Item name.
 * @property {number} sellIn - Sell price.
 * @property {number} quality - Quality (between 0 and 100).
 * @property {string} type - Type of item: "STANDARD", "CONJURED", "BACKSTAGE_PASS" or "LEGENDARY".
 */

/**
 * @typedef ChangingItem
 *
 * Item with trends over time.
 *
 * @type {Item}
 * @property {number} qualityTrend - Difference in quality during the last quality change.
 * @property {number} sellInTrend - Difference in sellIn during the last sellIn change.
 */

/**
 * @typedef ItemSet
 *
 * Items as stored in Redux state: indexed by IDs.
 *
 * @type {Object<string, ChangingItem}
 */

/**
 * Update items based on previous state.
 *
 * TODO Move this logic to the API.
 *
 * @param {ItemSet} prevItems - Previous items indexed by IDs.
 * @param {Item[]} items - New items set from the API.
 * @returns {Array} The new items indexed by IDs (ItemSet), and the number of added, removed and
 * udpated items (number).
 */
export function mergeItems(prevItems, items) {
  return items.reduce(
    ([nextItems, added, removed, updated], item) => {
      const prevItem = prevItems[item.id];
      const qualityTrend = prevItem && prevItem.quality - item.quality;
      const sellInTrend = prevItem && prevItem.sellIn - item.sellIn;
      return [
        // Item set
        {
          ...nextItems,
          [item.id]: {
            ...item,
            qualityTrend:
              qualityTrend || (prevItem ? prevItem.qualityTrend : 0),
            sellInTrend: sellInTrend || (prevItem ? prevItem.sellInTrend : 0),
          },
        },
        // Counts
        prevItem ? added : added + 1,
        prevItem ? removed - 1 : removed,
        qualityTrend || sellInTrend ? updated + 1 : updated,
      ];
    },
    [{}, 0, Object.keys(prevItems).length, 0],
  );
}

/**
 * Fetch items from the API.
 *
 * @returns {Promise<Item[]>} All items.
 */
export async function fetchItems() {
  const debug = process.env.REACT_APP_DEBUG;
  if (debug) {
    console.log(`Fetching items from ${API_URL_ITEMS}`); // eslint-disable-line no-console
  }

  const response = await fetch(API_URL_ITEMS);
  const items = await response.json();

  if (debug) {
    console.log(`Found ${items.length} items.`); // eslint-disable-line no-console
  }

  return items;
}

/**
 * Fetch items from the API and returns the sellable ones only.
 *
 * @returns {Promise<Item[]>} Sellable items.
 */
export async function fetchItemsForSale() {
  return (await fetchItems()).filter(
    item => item.type !== ITEM_TYPES.LEGENDARY,
  );
}

/**
 * Fetch item details from the API.
 *
 * @param {string} id - Item id.
 * @returns {Promise<Item>} Item details.
 */
export async function fetchItemDetails(id) {
  const debug = process.env.REACT_APP_DEBUG;
  const url = API_URL_ITEM(id);

  if (debug) {
    console.log(`Fetching item details from ${url}`); // eslint-disable-line no-console
  }

  const response = await fetch(url);
  const item = await response.json();

  if (debug) {
    console.log(`Found item details for "${item.name}".`); // eslint-disable-line no-console
  }

  return item;
}

/**
 * Generate the following effects:
 * 1. A call to fetchItemsForSale
 * 2. A selection of the existing item
 * 3. A new ITEMS_SET actions with the items returned by fetchItemsForSale with trends updated with
 *    previous items data.
 * 4. A new CART_REMOVE_ITEM action for each of the items that have been removed.
 * The existing items.
 *
 * @returns {Generator} A generator that yields the 3 desribed effects.
 */
export function* handleFetchItems() {
  try {
    const items = yield call(fetchItemsForSale);
    const prevItems = yield select(({ itemReducer }) => itemReducer.items);

    // ITEMS_SET action
    const [nextItems] = mergeItems(prevItems, items);
    yield put(doSetItems(nextItems));

    // n * CART_REMOVE_ITEM action
    // TODO: move to a separate cart saga
    const nextItemIds = Object.keys(nextItems);
    Object.keys(prevItems)
      .filter(id => nextItemIds.indexOf(id) === -1)
      .forEach(doRemoveItemFromCart);
  } catch (error) {
    if (process.env.REACT_APP_DEBUG) {
      console.error(`Error while fetching items: ${error}\n`, error.stack); // eslint-disable-line no-console
    }
    yield put(doFetchItemsError(error));
  }
}

/**
 * Generate two effects:
 * 1. A call to fetchItemDetails
 * 2. A new ITEM_SET actions with the item returned by fetchItemDetails.
 *
 * @param {Object} action - Action.
 * @param {string} action.id - Item id.
 * @returns {Generator} A generator that yields a call to fetchItemDetails and a ITEM_SET action.
 */
export function* handleFetchItemDetails({ id }) {
  try {
    const item = yield call(fetchItemDetails, id);
    if (item.error) {
      throw new Error(item.message || 'Unknown error');
    }
    yield put(doSetItem(item));
  } catch (error) {
    if (process.env.REACT_APP_DEBUG) {
      console.log(`Error while fetching item details: ${error}\n`, error.stack); // eslint-disable-line no-console
    }
    yield put(doFetchItemError(error));
  }
}

/**
 * Create the items fetching saga.
 *
 * @returns {Generator} The items fetching saga.
 */
export default function* itemsSaga() {
  yield all([
    takeEvery(ITEMS_FETCH, handleFetchItems),
    takeEvery(ITEM_FETCH, handleFetchItemDetails),
  ]);
}
