import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session'

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  let userPic;
  if (props.user && props.user.services){
    userPic = props.user.services.facebook ? `http://graph.facebook.com/${props.user.services.facebook.id}/picture/?type=normal` : '/images/noProfile.png';
  }
  console.log(userPic);

  // user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  return (
    <div className="header">
      <div className="header__content">
        <img className="note--toggle" src={navImageSrc} onClick={props.handleNavToggle} />
        <h1 className="header header__brand">{props.title}</h1>
        <div className='header--controls'>
          <img className='header--user-image' src={userPic} alt="Profile Picture" />
          <button className="button button--link-text"
            onClick={ () => {props.handleLogout()} }>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleNavToggle: PropTypes.func.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('userInfo');
  return {
    user: Meteor.user(),
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader)
// export default PrivateHeader;
