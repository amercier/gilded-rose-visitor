import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import { doStartPollingItems, doFetchItems } from '../lib/actions/item';

/**
 * Home page.
 *
 * @param {Object} props - React component properties.
 * @param {Item[]} props.items - Items to display.
 * @returns {React.Element} The rendered element.
 */
const Index = ({ items }) => (
  <div>
    <p>Hello Next.js</p>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Link as={`/i/${item.id}`} href={`/item?id=${item.id}`}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
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
};

Index.getInitialProps = async ({ ctx }) => {
  const { store, isServer } = ctx;

  // Start items polling on the browser, or 1 fetch if server-side
  store.dispatch(isServer ? doFetchItems() : doStartPollingItems());

  return {};
};

/**
 * Map Redux state to <QualityFilter> properties.
 *
 * @param {Item[]} state - Redux state.
 * @returns {Object} Properties for <QualityFilter> component.
 */
const mapStateToProps = state => ({
  items: Object.values(state.items),
});

export { Index };
export default connect(mapStateToProps)(Index);
