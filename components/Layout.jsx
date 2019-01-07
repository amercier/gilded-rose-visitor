import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import ConnectedHeader from './Header';

const Container = styled.div`
  width: 100%;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;
`;

/**
 * App layout.
 *
 * @param {*} children - Child components.
 * @returns {React.Element} The rendered element.
 */
const Layout = ({ children }) => (
  <>
    <CssBaseline />
    <ConnectedHeader />
    <Container>
      <FadeIn>{children}</FadeIn>
    </Container>
  </>
);

export default Layout;
