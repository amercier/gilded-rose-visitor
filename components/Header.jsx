import React from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonBar = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: middle;
  justify-content: flex-end;
`;

/**
 * Header.
 *
 * @param {Object} props - React component props.
 * @returns {React.Element} The rendered element.
 */
const Header = ({ cartLength }) => (
  <AppBar position="static">
    <Toolbar>
      <Container>
        <Link href="/">
          <Button color="inherit">
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ lineHeight: '64px' }}
            >
              Gilded Rose Inn
            </Typography>
          </Button>
        </Link>
        <ButtonBar>
          <Link href="/cart">
            <IconButton color="inherit">
              <Badge
                badgeContent={cartLength}
                color="secondary"
                invisible={cartLength === 0}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </ButtonBar>
      </Container>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  cartLength: number.isRequired,
};

/**
 * Map Redux state to <Header> component properties.
 *
 * @param {Item[]} state - Redux state.
 * @returns {Object} Properties for <Header> component component.
 */
const mapStateToProps = ({ cartReducer }) => ({
  cartLength: Object.values(cartReducer.cart).length,
});

export { Header };
export default connect(mapStateToProps)(Header);
