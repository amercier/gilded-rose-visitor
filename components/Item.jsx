import React from 'react';
import { bool, string, number, func, shape, arrayOf, any } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { doAddItemToCart, doRemoveItemFromCart } from '../lib/actions/cart';
import Type from './Type';

const CardLinkAnchor = styled.a`
  cursor: pointer;
  display: block;
  text-decoration: none;
  height: 100%;
`;

const NameContainer = styled.div`
  text-align: center;
  overflow: 'hidden';
  text-overflow: 'ellipsis';
`;

const TypeContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: space-around;
`;

/**
 * Card link.
 *
 * @param {Object} p - Component properties.
 * @param {bool} p.disabled -Whether the link should be disabled.
 * @param {mixed} p.children - Child components.
 * @param {Object} p.props - Remaining properties.
 * @returns {React.Element} Rendered element.
 */
const CardLink = ({ disabled, children, ...props }) =>
  disabled ? (
    children
  ) : (
    <Link {...props}>
      <CardLinkAnchor>{children}</CardLinkAnchor>
    </Link>
  );

/**
 * Display an item.
 *
 * @param {Object} props - React component properties.
 * @param {Item} props.item - Item to display.
 * @param {boolean} props.linkDisabled - Whether the link should be disabled.
 * @param {string[]} props.cart - Cart.
 * @param {Function} props.onAddItem - Function to call when an item is added to the cart.
 * @param {Function} props.onRemoveItem - Function to call when an item is removed from the cart.
 * @param {mixed} props.children - Child components, if any.
 * @returns {React.Element} The rendered element.
 */
const Item = ({
  item,
  linkDisabled,
  cart,
  onAddItem,
  onRemoveItem,
  children,
}) => (
  <Card>
    <CardLink
      as={`/i/${item.id}`}
      href={`/item?id=${item.id}`}
      disabled={linkDisabled}
    >
      <CardActionArea style={{ height: '100%' }}>
        <CardContent style={{ height: '100%' }}>
          <Typography gutterBottom variant="h5" component="h2">
            <NameContainer>{item.name}</NameContainer>
          </Typography>
          <TypeContainer>
            <Type type={item.type} />
          </TypeContainer>
          <InfoContainer>
            <Typography variant="subtitle1">Quality: {item.quality}</Typography>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              $ {item.sellIn}
            </Typography>
          </InfoContainer>
        </CardContent>
      </CardActionArea>
    </CardLink>

    <CardActions>
      {cart.indexOf(item.id) === -1 ? (
        <Button size="small" color="primary" onClick={() => onAddItem(item.id)}>
          Add to cart
        </Button>
      ) : (
        <Button
          size="small"
          color="secondary"
          onClick={() => onRemoveItem(item.id)}
        >
          Remove from cart
        </Button>
      )}
      {children}
    </CardActions>
  </Card>
);

Item.propTypes = {
  item: shape({
    id: string.isRequired,
    name: string.isRequired,
    sellIn: number.isRequired,
    quality: number.isRequired,
    type: string.isRequired,
  }).isRequired,
  linkDisabled: bool,
  cart: arrayOf(string).isRequired,
  onAddItem: func.isRequired,
  onRemoveItem: func.isRequired,
  children: any,
};

Item.defaultProps = {
  linkDisabled: false,
  children: null,
};

/**
 * Map Redux state to <Item> properties.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} Properties for <Item> component.
 */
const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart,
});

/**
 * Map Redux state to <Item> component properties.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {Object} Properties for <Item> component component.
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
