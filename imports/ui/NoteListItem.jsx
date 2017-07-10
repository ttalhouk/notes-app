import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

export class NoteListItem extends React.Component {
  handleDeleteNote() {
    console.log(this.props);
    if(confirm(`Delete ${this.props.note.title ? this.props.note.title  : 'the note' }?`)){
      Meteor.call('notes.remove', this.props.note._id);
      if (this.props.Session.get('selectedNoteId') === this.props.note._id) {
        this.props.browserHistory.replace('/dashboard');
      }
    }
  }

  render () {
    const className =  this.props.note.selected ? 'item item--selected' : 'item';
    return (
      <Swipeout
        left={[]}
        right={[
          {
            text: 'Del',
            onPress:() => this.handleDeleteNote(),
            style: { padding: '0 16px' },
            className: 'button--delete button__slide'
          },
          {
            text: 'Rtn',
            // onPress:() => console.log('close'),
            style: { padding: '0 16px' },
            className: 'button--cancel button__slide'
          }

        ]}
        autoClose={true}
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
      >
        <div
          className={className}
          onClick={() => this.props.Session.set('selectedNoteId', this.props.note._id)}>
          <h5 className="item__title">{this.props.note.title || 'Untitled Note'}</h5>
          <p className="item__subtitle">{moment(this.props.note.updatedAt).format('M/DD/YY')}</p>
        </div>
      </Swipeout>
    )
  }
}


NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default createContainer(() => {
  return {
    Session,
    browserHistory
  }
}, NoteListItem);
