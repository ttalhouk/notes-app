import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {Login} from './Login';

if (Meteor.isClient) {

  describe('<Login />', function(){

    it('should show error messages', function(){
      const error = 'This is an error';
      const wrapper = mount(<Login loginWithPassword={()=>{}} />);
      wrapper.setState({error});
      const pValue = wrapper.find('p').text();
      expect(pValue).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with form data', function(){
      const email = 'test@example.com';
      const password = 'password';
      const spy = expect.createSpy();

      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email});
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toNotBe('');

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error')).toBe('');

    });


  });

}
