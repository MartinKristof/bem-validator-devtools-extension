import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RulesList from './RulesList';
import Heading from './Heading';
import Icon from './icons/Icon';

const Validator = ({ rules, loading, error, isBemDetected, isValid, inspectElement }) => (
  <div className="main-container">
    <div className="col-md-6 col-md-push-3">
      <div className="panel panel-default no-connection">
        <div className="panel panel-heading">
          <h3 className="panel-title">CSS BEM validator</h3>
        </div>
        <div className="panel-body">
          {!loading && error && (
            <Fragment>
              <Heading>Any error occured!</Heading>
              <Icon kind="error" />
              <p className="secondary">{error}</p>
            </Fragment>
          )}
          {loading && (
            <Fragment>
              <Heading>Loading...</Heading>
              <Icon kind="loader" />
            </Fragment>
          )}
          {!loading && rules.length > 0 && !error && isBemDetected && !isValid && (
            <div>
              <Heading>Invalid!</Heading>
              <div>
                <Icon kind="invalid" />
                <p className="error">BEM errors found!</p>
              </div>
              <Heading>Invalid rules:</Heading>
              <table className="table-responsive table-striped text-center">
                <thead>
                  <tr>
                    <td>Missing class</td>
                    <td>Selector</td>
                  </tr>
                </thead>
                <tbody>
                  <RulesList rules={rules} inspectElement={inspectElement} />
                </tbody>
              </table>
            </div>
          )}
          {!loading && !error && isBemDetected && isValid && (
            <Fragment>
              <Heading>Valid!</Heading>
              <div>
                <Icon kind="valid" />
                <p className="success">No BEM errors found!</p>
              </div>
            </Fragment>
          )}
          {!loading && !error && !isBemDetected && !isValid && (
            <Fragment>
              <Heading>No BEM classes detected!</Heading>
              <Icon kind="unknown" />
              <p className="secondary">Nothing to lint!</p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

Validator.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.exact({ missingClassName: PropTypes.string.isRequired, selector: PropTypes.string.isRequired }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isBemDetected: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  inspectElement: PropTypes.func.isRequired,
};

export default Validator;
