import React from 'react';
import { string, number, shape, object } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { doFetchItem } from '../lib/actions/item';
import Layout from '../components/Layout';
import ConnectedItem from '../components/Item';

const Container = styled.div`
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
`;

/**
 * Item details page.
 *
 * @param {Object} props - React component properties.
 * @param {Item} props.item - Item to display.
 * @param {Item} props.error - Item error, if any.
 * @returns {React.Element} The rendered element.
 */
const Item = ({ item, error }) => (
  <Layout>
    {item && (
      <Container>
        <ConnectedItem item={item} linkDisabled>
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </ConnectedItem>
      </Container>
    )}
    {error && (
      <p>
        An error occured while retrieving your item information. Please retry
        later.
      </p>
    )}
  </Layout>
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

  // Fetch item details now
  store.dispatch(doFetchItem(query.id));

  return {};
};

/**
 * Map Redux state to <Item> properties.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} Properties for <Item> component.
 */
const mapStateToProps = ({ itemReducer, cartReducer }) => ({
  item: itemReducer.item,
  error: itemReducer.fetchItemError,
  cart: cartReducer.cart,
});

export { Item };
export default connect(mapStateToProps)(Item);
