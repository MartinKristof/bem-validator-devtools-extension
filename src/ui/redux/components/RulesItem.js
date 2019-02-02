import React from 'react';
import PropTypes from 'prop-types';

const RulesItem = ({ rule: { missingClassName, selector }, inspectElement }) => (
  <tr className="rules__item">
    <td>
      <strong>{missingClassName}</strong>
    </td>
    <td>
      <a href="#" className="rules__item-link" onClick={() => inspectElement(selector)}>
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
