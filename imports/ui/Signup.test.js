import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {Signup} from './Signup';

if (Meteor.isClient) {

  describe('<Signup />', function(){

    it('should show error messages', function(){
      const error = 'This is an error';
      const wrapper = mount(<Signup createUser={()=>{}} />);
      wrapper.setState({error});
      const pValue = wrapper.find('p').text();
      expect(pValue).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with form data', function(){
      const email = 'test@example.com';
      const password = 'password';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error with invalid password length', function(){
      const email = 'test@example.com';
      const password = 'pass';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    it('should set createUser callback errors', function(){
      const password = 'password';
      const reason = 'this is failure reason'
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
