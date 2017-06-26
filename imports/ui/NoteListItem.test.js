import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment'

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {

  describe('<NoteListItem />', function(){

    it('should show note item details', function(){
      const note = {
        _id: '1',
        title: 'Test Note',
        updatedAt: 1498493558790
      }
      const wrapper = mount(<NoteListItem note={note} />);
      let title = wrapper.find('h5').text();
      expect(title).toBe(note.title);
      let time = wrapper.find('p').text();
      expect(time).toBe('6/26/17');
    });

    it('should show default title if none given', function(){
      const note = {
        _id: '1',
        title: '',
        updatedAt: 1498493558790
      }
      const wrapper = mount(<NoteListItem note={note} />);
      let title = wrapper.find('h5').text();
      expect(title).toBe('Untitled Note');
      let time = wrapper.find('p').text();
      expect(time).toBe('6/26/17');
    });

  });
}
