import React from 'react';
import {Meteor} from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default () => {
  return(
    <div>
      <PrivateHeader title="BoilerPlate Project Dashboard" />
      <div className="wrapper">
        <NoteList />
      </div>
    </div>
  )
}
