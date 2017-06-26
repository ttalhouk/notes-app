import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment'

import {NoteListHeader} from './NoteListHeader';

if (Meteor.isClient) {

  describe('<NoteListHeader />', function(){

    it('should show a button to create note', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);
      let buttonText = wrapper.find('button').text();
      expect(buttonText).toBe('Create Note');
    });

    it('should call meteorCall to "notes.insert" when clicked', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);
      let button = wrapper.find('button');
      button.simulate('click');
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });

  });
};
