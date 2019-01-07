import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { doStartPollingItems, doFetchItems } from '../lib/actions/item';
import ConnectedIndex, { Index } from '.';

const itemsStub = {
  a: { id: 'a', name: 'ITEM A', quality: 10, sellIn: 10, type: 'STANDARD' },
  b: { id: 'b', name: 'ITEM B', quality: 20, sellIn: 20, type: 'STANDARD' },
  c: { id: 'c', name: 'ITEM C', quality: 30, sellIn: 30, type: 'LEGENDARY' },
};

describe('Index', () => {
  it('renders a list of items', () => {
    const noop = () => {}; // eslint-disable-line require-jsdoc
    const index = shallow(
      <Index
        items={Object.values(itemsStub)}
        cart={[]}
        onAddItem={noop}
        onRemoveItem={noop}
      />,
    );
    expect(index).toMatchSnapshot();
  });
});

describe('Index (Redux-connected)', () => {
  const mockStore = configureStore();

  it('uses values of items object from the store', () => {
    const store = mockStore({
      itemReducer: { items: itemsStub },
      cartReducer: { cart: [] },
    });
    const index = mount(
      <Provider store={store}>
        <ConnectedIndex />
      </Provider>,
    );
    const indexComponent = index.find(Index).first();
    expect(indexComponent.props().items).toEqual(Object.values(itemsStub));
  });

  describe('getInitialProps', () => {
    it('dispatches a ITEMS_FETCH action on the server', () => {
      const items = {};
      const store = mockStore({
        itemReducer: { items },
        cartReducer: { cart: [] },
      });
      Index.getInitialProps({ ctx: { store, isServer: true } });
      expect(store.getActions()).toEqual([doFetchItems(items)]);
    });

    it('dispatches a ITEMS_POLL_START action on the client', () => {
      const items = {};
      const store = mockStore({
        itemReducer: { items },
        cartReducer: { cart: [] },
      });
      Index.getInitialProps({ ctx: { store, isServer: false } });
      expect(store.getActions()).toEqual([doStartPollingItems()]);
    });
  });
});
