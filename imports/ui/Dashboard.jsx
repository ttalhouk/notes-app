import React from 'react';
import {Meteor} from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default () => {
  return(
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="wrapper">
        <NoteList />
        <Editor />
      </div>
    </div>
  )
}
