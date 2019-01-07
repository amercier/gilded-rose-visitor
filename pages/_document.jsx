import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * Initial document pre-rendering.
 */
export default class Document extends NextDocument {
  /**
   * Initial props.
   *
   * @param {Object} ctx - Context.
   * @returns {Promise} Initial props.
   */
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  /**
   * Render the component.
   *
   * @returns {React.Element} The rendered element.
   */
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {this.props.styleTags}
          <link rel="stylesheet" href="/nprogress.css" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
