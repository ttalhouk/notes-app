import React from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '../api/notes';

import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader />
      Note List Component {props.notes.length}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(()=> {
  Meteor.subscribe('notes');
  return {
    notes: Notes.find().fetch()
  }
}, NoteList)
