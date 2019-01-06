import React from 'react';
import { string, number, shape, func, object, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import { doFetchItem } from '../lib/actions/item';
import { doAddItemToCart, doRemoveItemFromCart } from '../lib/actions/cart';

/**
 * Item details page.
 *
 * @param {Object} props - React component properties.
 * @param {Item} props.item - Item to display.
 * @param {Item} props.error - Item error, if any.
 * @param {Function} props.onAddItem - Function to call when the item is added to the cart.
 * @param {Function} props.onRemoveItem - Function to call when the item is removed from the cart.
 * @returns {React.Element} The rendered element.
 */
const Item = ({ item, error, cart, onAddItem, onRemoveItem }) => (
  <main>
    {item && (
      <>
        <h1>{item.name}</h1>
        <dl>
          <dt>Type</dt>
          <dd>{item.type}</dd>
          <dt>Quality</dt>
          <dd>{item.quality}</dd>
          <dt>Price</dt>
          <dd>{item.sellIn}</dd>
        </dl>
        <p>
          {cart.indexOf(item.id) === -1 ? (
            <button type="button" onClick={() => onAddItem(item.id)}>
              Add to cart
            </button>
          ) : (
            <button type="button" onClick={() => onRemoveItem(item.id)}>
              Remove from cart
            </button>
          )}
        </p>
        <p>
          <Link href="/">
            <a>Back to items list</a>
          </Link>
        </p>
      </>
    )}
    {error && (
      <p>
        An error occured while retrieving your item information. Please retry
        later.
      </p>
    )}
  </main>
);

Item.propTypes = {
  item: shape({
    id: string,
    name: string,
    sellIn: number,
    quality: number,
    type: string,
  }),
  error: object,
  cart: arrayOf(string).isRequired,
  onAddItem: func.isRequired,
  onRemoveItem: func.isRequired,
};

Item.defaultProps = {
  item: undefined,
  error: undefined,
};

Item.getInitialProps = async ({ ctx }) => {
  const { store, query } = ctx;

  // Start items polling on the browser, or 1 fetch if server-side
  store.dispatch(doFetchItem(query.id));

  return {};
};

/**
 * Map Redux state to <QualityFilter> properties.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} Properties for <QualityFilter> component.
 */
const mapStateToProps = ({ itemReducer, cartReducer }) => ({
  item: itemReducer.item,
  error: itemReducer.fetchItemError,
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

export { Item };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);
