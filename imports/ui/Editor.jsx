import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import { Meteor } from 'meteor/meteor';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {body: e.target.value})
  }
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {title: e.target.value})
  }
  render () {
    if (this.props.note) {
      return (
        <div>
          <input
            value={this.props.note.title}
            placeholder="Note Title"
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea
            value={this.props.note.body}
            placeholder="Note details"
            onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
        </div>
      )
    } else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note not found' : 'Pick or Create a note to get started.'}
        </p>
      )
    }

  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  }
}, Editor);
