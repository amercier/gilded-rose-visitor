import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { doFetchItems } from '../lib/actions/item';
import Layout from '../components/Layout';
import ConnectedItem from '../components/Item';

export const xs = 12;
export const sm = 6;
export const md = 4;
export const lg = 4;
export const xl = 4;

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
const Index = ({ items, cart }) => (
  <Layout>
    <Grid container spacing={24}>
      {items.map(item => (
        <Grid key={item.id} item {...{ xs, sm, md, lg, xl }}>
          <ConnectedItem item={item} isInCart={cart.indexOf(item) !== -1} />
        </Grid>
      ))}
    </Grid>
  </Layout>
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
};

Index.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  // Fetch items now
  store.dispatch(doFetchItems());

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

export { Index };
export default connect(mapStateToProps)(Index);
