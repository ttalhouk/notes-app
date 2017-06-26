import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {NoteList} from './NoteList';

const notes = [
  {
    _id: 'noteId1',
    title: 'Test Note 1',
    body: 'Test 1 body',
    userId: 'userId1',
    updatedAt: 1498493558790
  },
  {
    _id: 'noteId2',
    title: 'Test Note 2',
    body: 'Test 2 body',
    userId: 'userId2',
    updatedAt: 1498493558790
  }
]

if (Meteor.isClient) {

  describe('<NoteList />', function(){
    it('should render <NoteListItem> for each note', function(){

      const wrapper = mount(<NoteList notes={notes} />);
      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render <NoteListEmptyItem> if no notes', function(){

      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
