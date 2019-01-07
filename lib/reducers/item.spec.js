import itemReducer from './item';
import { doFetchItems, doSetItems, doFetchItemsError } from '../actions/item';

describe('itemReducer', () => {
  let prevState;

  beforeEach(() => {
    prevState = itemReducer();
  });

  describe('initial state', () => {
    it('sets items to an empty object', () => {
      expect(prevState.items).toEqual({});
    });

    it('sets fetchingItems to false', () => {
      expect(prevState.fetchingItems).toBe(false);
    });

    it('sets fetchedItemsOnce to false', () => {
      expect(prevState.fetchedItemsOnce).toBe(false);
    });

    it("doesn't set fetchItemsError", () => {
      expect(prevState.fetchItemsError).toBeUndefined();
    });
  });

  describe('ITEMS_FETCH', () => {
    it('sets fetchingItems to true', () => {
      const { fetchingItems } = itemReducer(prevState, doFetchItems());
      expect(fetchingItems).toBe(true);
    });

    it('preserves the rest of state', () => {
      const { fetchingItems, ...rest } = itemReducer(prevState, doFetchItems());
      expect(prevState).toMatchObject(rest);
    });
  });

  describe('ITEMS_FETCH_ERROR', () => {
    it('sets fetchItemsError to the given error', () => {
      const ERROR = new Error();
      const { fetchItemsError } = itemReducer(
        prevState,
        doFetchItemsError(ERROR),
      );
      expect(fetchItemsError).toBe(ERROR);
    });

    it('sets fetchingItems to false', () => {
      const { fetchingItems } = itemReducer(prevState, doFetchItemsError({}));
      expect(fetchingItems).toBe(false);
    });

    it('sets fetchedItemsOnce to true', () => {
      const { fetchedItemsOnce } = itemReducer(
        prevState,
        doFetchItemsError({}),
      );
      expect(fetchedItemsOnce).toBe(true);
    });

    it('preserves the rest of state', () => {
      const {
        fetchItemsError,
        fetchingItems,
        fetchedItemsOnce,
        ...rest
      } = itemReducer(prevState, doFetchItemsError());
      expect(prevState).toMatchObject(rest);
    });
  });

  describe('ITEMS_SET', () => {
    it('sets items to the given items', () => {
      const ITEMS = {};
      const { items } = itemReducer(prevState, doSetItems(ITEMS));
      expect(items).toBe(ITEMS);
    });

    it('sets fetchingItems to false', () => {
      const { fetchingItems } = itemReducer(prevState, doSetItems({}));
      expect(fetchingItems).toBe(false);
    });

    it('sets fetchedItemsOnce to true', () => {
      const { fetchedItemsOnce } = itemReducer(prevState, doSetItems({}));
      expect(fetchedItemsOnce).toBe(true);
    });

    it('unsets fetchItemsError', () => {
      prevState.fetchItemsError = new Error();
      const { fetchItemsError } = itemReducer(prevState, doSetItems({}));
      expect(fetchItemsError).toBeUndefined();
    });

    it('preserves the rest of state', () => {
      const {
        items,
        fetchItemsError,
        fetchingItems,
        fetchedItemsOnce,
        ...rest
      } = itemReducer(prevState, doSetItems({}));
      expect(prevState).toMatchObject(rest);
    });
  });

  // TODO Add specs for ITEM_FETCH
  // TODO Add specs for ITEM_FETCH_ERROR
  // TODO Add specs for ITEM_SET
});
