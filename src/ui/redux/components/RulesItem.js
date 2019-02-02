import React from 'react';
import PropTypes from 'prop-types';

const RulesItem = ({ rule: { missingClassName, selector }, inspectElement }) => (
  <tr>
    <td>
      <strong>{missingClassName}</strong>
    </td>
    <td>
      <a href="#" onClick={() => inspectElement(selector)}>
        <em>{selector}</em>
      </a>
    </td>
  </tr>
);

RulesItem.propTypes = {
  rule: PropTypes.exact({
    missingClassName: PropTypes.string.isRequired,
    selector: PropTypes.string.isRequired,
  }).isRequired,
  inspectElement: PropTypes.func.isRequired,
};

export default RulesItem;
