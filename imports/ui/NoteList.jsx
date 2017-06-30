import React from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';

import FlipMove from 'react-flip-move';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  renderNotes() {
    const result = this.props.notes
      .filter((note) => {
        if (note.title.indexOf(this.state.searchTerm) !== -1) {
          return note
        };
      })
      .map((note) => {
        return (
          <NoteListItem key={note._id} note={note} />
        );
      });

    if (result.length === 0 && this.props.notes.length > 0) {
      result.push(
        <p key='0' className="empty-item">
          No notes with that title found.
        </p>
      );
    }
    return result;

  }

  handleSearchTermChange(e) {
    let searchTerm = e.target.value;
    this.setState({searchTerm});
  }

  clearSearch() {
    this.setState({searchTerm: ''});
  }

  render () {
    return (
      <div className="item-list">
        <NoteListHeader />
        <div className="item-list__search">
          <input
            type='search'
            placeholder="Search for a note"
            onChange={this.handleSearchTermChange.bind(this)} value={this.state.searchTerm} />
          <button
            onClick={this.clearSearch.bind(this)}
            className="button button--secondary">
            Clear
          </button>
        </div>
        { this.props.notes.length > 0 ? undefined : <NoteListEmptyItem />}
        <FlipMove duration={300} easing="ease-out">
          { this.renderNotes() }
        </FlipMove>
      </div>
    )
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(()=> {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  }
}, NoteList)
