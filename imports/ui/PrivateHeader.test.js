import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {
  describe('<PrivateHeader />', function() {
    it('should set button text to Logout', function() {
      const wrapper = mount(<PrivateHeader title='Test Title' handleLogout={() => {}} />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should render title from props', function() {
      let title = 'Test Title';
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />);
      const headerText = wrapper.find('h1').text();

      expect(headerText).toBe(title);
    });

    it('should call the handleLogout function on click', function(){
      let title = 'Test Title';
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title={title} handleLogout={spy} />);
      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  })
}
