import { delay } from 'redux-saga';
import fetch from 'isomorphic-unfetch';
import {
  call,
  put,
  race,
  take,
  takeEvery,
  select,
  all,
} from 'redux-saga/effects';
import { doFetchItems, doSetItems, doFetchItemError } from '../actions/item';
import { API_URL_ITEMS } from '../constants/api';
import {
  ITEMS_POLL_START,
  ITEMS_POLL_STOP,
  ITEMS_FETCH,
} from '../constants/actionTypes';

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
 * Generate two effects:
 * 1. A call to fetchItemsForSale
 * 2. A new ITEMS_SET actions with the items returned by fetchItemsForSale.
 *
 * @returns {Generator} A generator that yields a call to fetchItemsForSale and a ITEMS_SET action.
 */
export function* handleFetchItems() {
  try {
    const items = yield call(fetchItemsForSale);
    const prevItems = yield select(state => state.items);
    const [nextItems] = mergeItems(prevItems, items);
    yield put(doSetItems(nextItems));
  } catch (error) {
    yield put(doFetchItemError(error));
  }
}

/**
 * Generate the following effects infinitely:
 * 1. A new ITEMS_FETCH action.
 * 2. A call to wait() with the given delay.
 *
 * @param {number} ms - Time to wait before next poll, in ms.
 * @returns {Generator} A generator that yields infinitely a ITEMS_SET action and a call to wait.
 */
export function* handlePollItems(ms) {
  while (true) {
    yield put(doFetchItems());
    yield call(delay, ms);
  }
}

/**
 * Generate the following effects infinitely:
 * 1. A wait for the ITEMS_POLL_START action.
 * 2. A race between a handlePollItems call and a wait for ITEMS_POLL_STOP. This means effects from
 *    handlePollItems will be treated infinitely, until a ITEMS_POLL_STOP action is received.
 *
 * @returns {Generator} A generator that yields infinitely a wait forITEMS_POLL_START action and the
 * polling race.
 */
export function* watchPollItemsStart() {
  while (true) {
    const action = yield take(ITEMS_POLL_START);
    yield race([call(handlePollItems, action.delay), take(ITEMS_POLL_STOP)]);
  }
}

/**
 * Create the items poll start/stop saga.
 *
 * @returns {Generator} The items poll start/stop saga.
 */
export default function* itemsSaga() {
  yield all([takeEvery(ITEMS_FETCH, handleFetchItems), watchPollItemsStart()]);
}
