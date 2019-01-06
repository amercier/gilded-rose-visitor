import React from 'react';
import { string, number, func, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import { doStartPollingItems, doFetchItems } from '../lib/actions/item';
import { doAddItemToCart, doRemoveItemFromCart } from '../lib/actions/cart';

/**
 * Home page.
 *
 * @param {Object} props - React component properties.
 * @param {Item[]} props.items - Items to display.
 * @param {string[]} props.cart - ID.
 * @param {Function} props.onAddItem - Function to call when an item is added to the cart.
 * @param {Function} props.onRemoveItem - Function to call when an item is removed from the cart.
 * @returns {React.Element} The rendered element.
 */
const Index = ({ items, cart, onAddItem, onRemoveItem }) => (
  <main>
    <h1>Gilded Rose Inn</h1>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Link as={`/i/${item.id}`} href={`/item?id=${item.id}`}>
            <a>{item.name}</a>
          </Link>
          {cart.indexOf(item.id) === -1 ? (
            <button type="button" onClick={() => onAddItem(item.id)}>
              Add to cart
            </button>
          ) : (
            <button type="button" onClick={() => onRemoveItem(item.id)}>
              Remove from cart
            </button>
          )}
        </li>
      ))}
    </ul>
  </main>
);

Index.propTypes = {
  items: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      sellIn: number.isRequired,
      quality: number.isRequired,
      type: string.isRequired,
    }).isRequired,
  ).isRequired,
  cart: arrayOf(string).isRequired,
  onAddItem: func.isRequired,
  onRemoveItem: func.isRequired,
};

Index.getInitialProps = async ({ ctx }) => {
  const { store, isServer } = ctx;

  // Start items polling on the browser, or 1 fetch if server-side
  store.dispatch(isServer ? doFetchItems() : doStartPollingItems());

  return {};
};

/**
 * Map Redux state to <Index> component properties.
 *
 * @param {Item[]} state - Redux state.
 * @returns {Object} Properties for <Index> component component.
 */
const mapStateToProps = ({ itemReducer, cartReducer }) => ({
  items: Object.values(itemReducer.items),
  cart: Object.values(cartReducer.cart),
});

/**
 * Map Redux state to <Index> component properties.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {Object} Properties for <Index> component component.
 */
const mapDispatchToProps = dispatch => ({
  onAddItem: id => dispatch(doAddItemToCart(id)),
  onRemoveItem: id => dispatch(doRemoveItemFromCart(id)),
});

export { Index };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
