import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Table } from 'reactstrap';
import RulesList from './RulesList';
import Heading from './Heading';
import Icon from './icons/Icon';

const Validator = ({ rules, loading, error, isBemDetected, isValid, inspectElement }) => (
  <Container className="text-center">
    <Row className="my-4">
      <Col>
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
            <Table responsive striped>
              <thead>
                <tr>
                  <td>Missing class</td>
                  <td>Selector</td>
                </tr>
              </thead>
              <tbody>
                <RulesList rules={rules} inspectElement={inspectElement} />
              </tbody>
            </Table>
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
      </Col>
    </Row>
  </Container>
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
