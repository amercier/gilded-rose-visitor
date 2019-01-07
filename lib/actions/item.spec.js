import {
  ITEMS_FETCH,
  ITEMS_FETCH_ERROR,
  ITEMS_SET,
} from '../constants/actionTypes';
import { doFetchItems, doFetchItemsError, doSetItems } from './item';

describe('doFetchItems', () => {
  it('returns a ITEMS_FETCH action', () => {
    expect(doFetchItems().type).toBe(ITEMS_FETCH);
  });
});

describe('doFetchItemsError', () => {
  it('returns a ITEMS_FETCH_ERROR action', () => {
    expect(doFetchItemsError().type).toBe(ITEMS_FETCH_ERROR);
  });

  it('provides the given error', () => {
    const ERROR = {};
    expect(doFetchItemsError(ERROR).error).toBe(ERROR);
  });
});

describe('doSetItems', () => {
  it('returns a ITEMS_SET action', () => {
    expect(doSetItems().type).toBe(ITEMS_SET);
  });

  it('provides the given items', () => {
    const ITEMS = {};
    expect(doSetItems(ITEMS).items).toBe(ITEMS);
  });
});

// TODO Add specs for doFetchItem
// TODO Add specs for doFetchItemError
// TODO Add specs for doSetItem
