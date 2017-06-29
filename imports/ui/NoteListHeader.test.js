import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment'

import {NoteListHeader} from './NoteListHeader';
import {notes} from '../fixtures/fixtures';


if (Meteor.isClient) {

  describe('<NoteListHeader />', function(){
    let meteorCall;
    let Session;

    beforeEach(function(){
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });

    it('should show a button to create note', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} />);
      let buttonText = wrapper.find('button').text();
      expect(buttonText).toBe('Create Note');
    });

    it('should call meteorCall to "notes.insert" when clicked', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
      let button = wrapper.find('button');
      button.simulate('click');

      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);

    });

    it('should not set selectedNoteId if there is an error', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
      let button = wrapper.find('button');
      button.simulate('click');

      meteorCall.calls[0].arguments[1]("error", undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();

    });


  });
};
