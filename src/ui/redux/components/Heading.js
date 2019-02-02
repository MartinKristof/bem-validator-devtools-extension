import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ children }) => (
  <div>
    <h4>{children}</h4>
  </div>
);

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Heading;
