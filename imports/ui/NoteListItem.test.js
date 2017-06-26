import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment'

import {NoteListItem} from './NoteListItem';

import { notes } from '../fixtures/fixtures';


if (Meteor.isClient) {

  describe('<NoteListItem />', function(){
    let Session;
    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should show note item details', function(){
      const note = notes[0];
      const wrapper = mount(<NoteListItem note={note} Session={Session} />);
      let title = wrapper.find('h5').text();
      expect(title).toBe(note.title);
      let time = wrapper.find('p').text();
      expect(time).toBe('6/26/17');
    });

    it('should show default title if none given', function(){
      const note = notes[1];
      const wrapper = mount(<NoteListItem note={note} Session={Session} />);
      let title = wrapper.find('h5').text();
      expect(title).toBe('Untitled Note');
      let time = wrapper.find('p').text();
      expect(time).toBe('6/26/17');
    });

    it('should call set when item is selected', function() {
      const note = notes[0];
      const wrapper = mount(<NoteListItem note={note} Session={Session} />)
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', note._id);
    })
  });
}
