import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import makeStore from '../lib/store';

/**
 * Redux-connected app, using next-redux-wrapper.
 */
class ReduxApp extends App {
  /**
   * Get initial props.
   *
   * @param {Object} input - Input.
   * @param {React.Componnet} input.Component - The component.
   * @param {Object} input.context - Context.
   * @returns {Promise<Object>} An object containing page props.
   */
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  /**
   * Render the app.
   *
   * @returns {React.Element} The rendered element.
   */
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga({ async: true })(ReduxApp));
