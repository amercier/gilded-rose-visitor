import { API_URL_ITEMS } from '../../constants/api';

// TODO: find a better place for this.
export const ITEMS = [
  { id: 'a', quality: 10, sellIn: 10 },
  { id: 'b', quality: 20, sellIn: 20 },
  { id: 'c', quality: 30, sellIn: 30 },
];

/**
 * Stub for isomorphic-fetch.
 *
 * @param {string} url - API URL.
 * @returns {mixed} The fake data as an object, array, etc.
 */
export default function fetchMock(url) {
  return {
    /**
     * Return the JSON data.
     *
     * @returns {mixed} The fake data as an object, array, etc.
     */
    json() {
      switch (url) {
        case API_URL_ITEMS:
          return ITEMS;
        default:
          throw new Error(`Unsupported URL: ${url}`);
      }
    },
  };
}
