import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'


import ThingItemComponent from '../../components/Things/ThingItem'


describe('<ThingItemComponent />', () => {
  it('renders the Item Name', () => {
    const wrapper = shallow(<ThingItemComponent name='shoobie' />)
    expect(wrapper.text()).to.equal('shoobie')
  });
});