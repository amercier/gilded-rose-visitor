import React from 'react';
import { string, number, shape, object } from 'prop-types';
import { connect } from 'react-redux';
import { doFetchItem } from '../lib/actions/item';

/**
 * Item details page.
 *
 * @param {Object} props - React component properties.
 * @param {Item} props.item - Item to display.
 * @param {Item} props.error - Item error, if any.
 * @returns {React.Element} The rendered element.
 */
const Item = ({ item, error }) => (
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
const mapStateToProps = state => ({
  item: state.item,
  error: state.fetchItemError,
});

export { Item };
export default connect(mapStateToProps)(Item);
