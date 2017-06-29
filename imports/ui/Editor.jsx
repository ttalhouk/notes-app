import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import { Meteor } from 'meteor/meteor';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    };
  }

  handleBodyChange(e) {
    let body = e.target.value;
    this.setState({body});
    this.props.call('notes.update', this.props.note._id, {body})
  }
  handleTitleChange(e) {
    let title = e.target.value;
    this.setState({title});
    this.props.call('notes.update', this.props.note._id, {title})
  }
  handleDeleteNote() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.replace('/dashboard');
  }
  render () {
    if (this.props.note) {
      return (
        <div className="editor">
          <input
            value={this.state.title}
            placeholder="Note Title"
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea
            value={this.state.body}
            placeholder="Note details"
            onChange={this.handleBodyChange.bind(this)}></textarea>
          <button
            className="button"
            onClick={this.handleDeleteNote.bind(this)}>
            Delete Note
          </button>
        </div>
      )
    } else {
      return (
        <div className="editor">          
          <p>
            {this.props.selectedNoteId ? 'Note not found' : 'Pick or Create a note to get started.'}
          </p>
        </div>
      )
    }

  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  }
}, Editor);
