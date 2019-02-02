import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import RulesItem from './RulesItem';

const RulesList = ({ rules, inspectElement }) =>
  rules.map((rule) => <RulesItem key={uuid()} rule={rule} inspectElement={inspectElement} />);

RulesList.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.exact({ missingClassName: PropTypes.string.isRequired, selector: PropTypes.string.isRequired }),
  ).isRequired,
  inspectElement: PropTypes.func.isRequired,
};

export default RulesList;
