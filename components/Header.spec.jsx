import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import ConnectedHeader, { Header } from './Header';

describe('Header', () => {
  it('renders the header', () => {
    const index = shallow(<Header cartLength={10} />);
    expect(index).toMatchSnapshot();
  });
});

describe('Header (Redux-connected)', () => {
  const mockStore = configureStore();

  it('uses values of cart object from the store', () => {
    const store = mockStore({
      cartReducer: { cart: ['a', 'b'] },
    });
    const index = mount(
      <Provider store={store}>
        <ConnectedHeader />
      </Provider>,
    );
    const indexComponent = index.find(Header).first();
    expect(indexComponent.props().cartLength).toEqual(2);
  });
});
