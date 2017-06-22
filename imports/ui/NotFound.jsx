import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router'

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page not found</h1>
        <p>Sorry, could not locate that page</p>
        <Link to="/" className="button button--link">Head Home</Link>
      </div>
    </div>
  )
}
