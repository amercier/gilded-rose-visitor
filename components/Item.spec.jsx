import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './Item';

const itemStub = {
  id: 'a',
  name: 'ITEM A',
  quality: 10,
  sellIn: 10,
  type: 'STANDARD',
};

const noop = () => {}; // eslint-disable-line require-jsdoc

describe('Item', () => {
  it('renders a item that is not in the cart', () => {
    const index = shallow(
      <Item item={itemStub} cart={[]} onAddItem={noop} onRemoveItem={noop} />,
    );
    expect(index).toMatchSnapshot();
  });

  it('renders a item that is in the cart', () => {
    const index = shallow(
      <Item
        item={itemStub}
        cart={[itemStub.id]}
        onAddItem={noop}
        onRemoveItem={noop}
      />,
    );
    expect(index).toMatchSnapshot();
  });
});
