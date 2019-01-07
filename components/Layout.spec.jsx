import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('Layout', () => {
  it('renders a list of items', () => {
    const index = shallow(<Layout>CONTENT</Layout>);
    expect(index).toMatchSnapshot();
  });
});
