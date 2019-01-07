import React from 'react';
import { string, number, func, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import { doStartPollingItems, doFetchItems } from '../lib/actions/item';
import { doRemoveItemFromCart } from '../lib/actions/cart';

/**
 * Home page.
 *
 * @param {Object} props - React component properties.
 * @param {Item[]} props.items - Items in the cart.
 * @param {Function} props.onRemoveItem - Function to call when an item is removed from the cart.
 * @returns {React.Element} The rendered element.
 */
const Cart = ({ items, onRemoveItem }) => (
  <main>
    <h1>Your cart</h1>

    {items.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Quality</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <Link as={`/i/${item.id}`} href={`/item?id=${item.id}`}>
                    <a>{item.name}</a>
                  </Link>
                </td>
                <td>{item.type}</td>
                <td>{item.quality}</td>
                <td>{item.sellIn}</td>
                <td>
                  <button type="button" onClick={() => onRemoveItem(item.id)}>
                    Remove from cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>TOTAL</th>
              <th />
              <th />
              <th>{items.reduce((total, { sellIn }) => total + sellIn, 0)}</th>
              <th />
            </tr>
          </tfoot>
        </table>

        <p>
          <button type="button">Proceed to checkout</button>
        </p>
      </>
    )}
    <p>
      <Link href="/">
        <a>Go back to shopping.</a>
      </Link>
    </p>
  </main>
);

Cart.propTypes = {
  items: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      sellIn: number.isRequired,
      quality: number.isRequired,
      type: string.isRequired,
    }).isRequired,
  ).isRequired,
  onRemoveItem: func.isRequired,
};

Cart.getInitialProps = async ({ ctx }) => {
  const { store, isServer } = ctx;

  // Start items polling on the browser, or 1 fetch if server-side
  store.dispatch(isServer ? doFetchItems() : doStartPollingItems());

  return {};
};

/**
 * Map Redux state to <Cart> component properties.
 *
 * @param {Item[]} state - Redux state.
 * @returns {Object} Properties for <Cart> component component.
 */
const mapStateToProps = ({ itemReducer, cartReducer }) => ({
  items: cartReducer.cart
    .map(id => itemReducer.items[id])
    .filter(item => !!item),
});

/**
 * Map Redux state to <Cart> component properties.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {Object} Properties for <Cart> component component.
 */
const mapDispatchToProps = dispatch => ({
  onRemoveItem: id => dispatch(doRemoveItemFromCart(id)),
});

export { Cart };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
