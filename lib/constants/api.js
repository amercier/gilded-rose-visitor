/**
 * Base API URL.
 *
 * Use `REACT_APP_API_URL` environment variable is defined, otherwise default to hardcoded value.
 * TODO Add support for REACT_APP_API_URL
 *
 * @type {string}
 */
const API_URL_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Items index API URL.
 *
 * @type {[type]}
 */
export const API_URL_ITEMS = `${API_URL_BASE}/items/`;

/**
 * Get item details API URL.
 *
 * @param {string} id - Item id.
 * @returns {string} The item details API URL.
 */
export const API_URL_ITEM = id => `${API_URL_BASE}/items/${id}/`;
