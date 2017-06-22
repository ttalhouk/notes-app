import React from 'react';
import {Meteor} from 'meteor/meteor';



import PrivateHeader from './PrivateHeader';

export default () => {
  return(
    <div>
      <PrivateHeader title="BoilerPlate Project Dashboard" />
      <div className="wrapper">
        Dashboard page content
      </div>
    </div>
  )
}
