import React from 'react';
import { string, number, func, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { doStartPollingItems, doFetchItems } from '../lib/actions/item';
import { doRemoveItemFromCart } from '../lib/actions/cart';
import Layout from '../components/Layout';
import Type from '../components/Type';

const ActionsContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
`;

/**
 * Home page.
 *
 * @param {Object} props - React component properties.
 * @param {Item[]} props.items - Items in the cart.
 * @param {Function} props.onRemoveItem - Function to call when an item is removed from the cart.
 * @returns {React.Element} The rendered element.
 */
const Cart = ({ items, onRemoveItem }) => (
  <Layout>
    <Typography gutterBottom variant="h2" component="h2">
      Your cart
    </Typography>
    <Paper style={{ padding: '2rem' }}>
      {items.length === 0 ? (
        <>
          <Typography variant="subheading" component="p">
            Your cart is empty.
          </Typography>
          <ActionsContainer>
            <Link href="/">
              <Button>Back to shopping</Button>
            </Link>
          </ActionsContainer>
        </>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="right">Quality</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant="body2">{item.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Type type={item.type} />
                  </TableCell>
                  <TableCell align="right">{item.quality}</TableCell>
                  <TableCell align="right">$ {item.sellIn}</TableCell>
                  <TableCell>
                    <Link as={`/i/${item.id}`} href={`/item?id=${item.id}`}>
                      <Button color="primary">View</Button>
                    </Link>
                    <Button
                      color="secondary"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>TOTAL</TableCell>
                <TableCell />
                <TableCell />
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                  $ {items.reduce((total, { sellIn }) => total + sellIn, 0)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>

          <ActionsContainer>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '2rem' }}
            >
              Proceed to checkout
            </Button>
            <Link href="/">
              <Button>Back to shopping</Button>
            </Link>
          </ActionsContainer>
        </>
      )}
    </Paper>
  </Layout>
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
