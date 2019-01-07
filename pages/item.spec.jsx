import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { doFetchItem } from '../lib/actions/item';
import ConnectedItem, { Item } from './item';

const itemStub = {
  a: { id: 'a', name: 'ITEM A', quality: 10, sellIn: 10, type: 'STANDARD' },
};

describe('Item', () => {
  it('renders an item', () => {
    const noop = () => {}; // eslint-disable-line require-jsdoc
    const index = shallow(
      <Item item={itemStub} cart={[]} onAddItem={noop} onRemoveItem={noop} />,
    );
    expect(index).toMatchSnapshot();
  });
});

describe('Item (Redux-connected)', () => {
  const mockStore = configureStore();

  it('uses item object from the store', () => {
    const store = mockStore({
      itemReducer: { item: itemStub },
      cartReducer: { cart: [] },
    });
    const index = mount(
      <Provider store={store}>
        <ConnectedItem />
      </Provider>,
    );
    const indexComponent = index.find(Item).first();
    expect(indexComponent.props().item).toEqual(itemStub);
  });

  describe('getInitialProps', () => {
    it('dispatches a ITEM_FETCH action', () => {
      const item = {};
      const store = mockStore({
        itemReducer: { item },
        cartReducer: { cart: [] },
      });
      Item.getInitialProps({ ctx: { store, query: { id: item.id } } });
      expect(store.getActions()).toEqual([doFetchItem(item.id)]);
    });
  });
});
