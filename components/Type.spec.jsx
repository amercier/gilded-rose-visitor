import React from 'react';
import { shallow } from 'enzyme';
import Type from './Type';

describe('Layout', () => {
  it('renders a STANDARD type', () => {
    expect(shallow(<Type type="STANDARD" />)).toMatchSnapshot();
  });

  it('renders a BACKSTAGE_PASS type', () => {
    expect(shallow(<Type type="BACKSTAGE_PASS" />)).toMatchSnapshot();
  });

  it('renders a CONJURED type', () => {
    expect(shallow(<Type type="CONJURED" />)).toMatchSnapshot();
  });
});
