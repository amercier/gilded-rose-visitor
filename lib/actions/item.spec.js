import {
  ITEMS_POLL_START,
  ITEMS_POLL_STOP,
  ITEMS_FETCH,
  ITEMS_FETCH_ERROR,
  ITEMS_SET,
} from '../constants/actionTypes';
import {
  doStartPollingItems,
  doStopPollingItems,
  doFetchItems,
  doFetchItemError,
  doSetItems,
} from './item';

describe('doStartPollingItems', () => {
  it('returns a ITEMS_POLL_START action', () => {
    expect(doStartPollingItems().type).toBe(ITEMS_POLL_START);
  });
});

describe('doStopPollingItems', () => {
  it('returns a ITEMS_POLL_STOP action', () => {
    expect(doStopPollingItems().type).toBe(ITEMS_POLL_STOP);
  });
});

describe('doFetchItems', () => {
  it('returns a ITEMS_FETCH action', () => {
    expect(doFetchItems().type).toBe(ITEMS_FETCH);
  });
});

describe('doFetchItemError', () => {
  it('returns a ITEMS_FETCH_ERROR action', () => {
    expect(doFetchItemError().type).toBe(ITEMS_FETCH_ERROR);
  });

  it('provides the given error', () => {
    const ERROR = {};
    expect(doFetchItemError(ERROR).error).toBe(ERROR);
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
