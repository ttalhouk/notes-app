import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      copied: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body,
        copying: false
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
    if(confirm(`Delete ${this.state.title ? this.state.title : 'the note' }?`)){
      this.props.call('notes.remove', this.props.note._id);
      this.props.browserHistory.replace('/dashboard');
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard('#copy');
    this.clipboard.on('success', () => {
      this.setState({copied: true});
      setTimeout(() => {
        this.setState({copied: false})
      }, 1000);
    }).on('error', () => {
      alert('Could not copy link. Please copy manually.');
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render () {
    if (this.props.note) {
      return (
        <div className="editor">
          <input
            value={this.state.title}
            placeholder="Note Title"
            className="editor__title"
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea
            value={this.state.body}
            placeholder="Note details"
            className="editor__body"
            onChange={this.handleBodyChange.bind(this)}></textarea>
          <div className='button__group'>
            <button
              id='copy'
              className="button button--copy"
              data-clipboard-text={this.state.body}
              >
              {this.state.copied ? 'Copied...' : 'Copy Text'}
            </button>
            <button
              className="button button--secondary"
              onClick={() => this.handleDeleteNote()}>
              Delete Note
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
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
  browserHistory: PropTypes.object.isRequired,
  confirm: PropTypes.func.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory,
    confirm: confirm
  }
}, Editor);
