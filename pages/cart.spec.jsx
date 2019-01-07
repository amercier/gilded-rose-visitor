import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import ConnectedCart, { Cart } from './cart';

const itemsStub = {
  a: { id: 'a', name: 'ITEM A', quality: 10, sellIn: 10, type: 'STANDARD' },
  b: { id: 'b', name: 'ITEM B', quality: 20, sellIn: 20, type: 'STANDARD' },
  c: { id: 'c', name: 'ITEM C', quality: 30, sellIn: 30, type: 'LEGENDARY' },
};

describe('Cart', () => {
  it('renders a list of items', () => {
    const noop = () => {}; // eslint-disable-line require-jsdoc
    const index = shallow(
      <Cart items={Object.values(itemsStub)} onRemoveItem={noop} />,
    );
    expect(index).toMatchSnapshot();
  });
});

describe('Cart (Redux-connected)', () => {
  const mockStore = configureStore();

  it('uses values of items and cart object from the store', () => {
    const store = mockStore({
      itemReducer: { items: itemsStub },
      cartReducer: { cart: ['a', 'b'] },
    });
    const index = mount(
      <Provider store={store}>
        <ConnectedCart />
      </Provider>,
    );
    const indexComponent = index.find(Cart).first();
    expect(indexComponent.props().items).toEqual([itemsStub.a, itemsStub.b]);
  });
});
