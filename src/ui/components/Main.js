import React from 'react';

const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;

const Main = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('ConnectionStore')],

  getStateFromFlux() {
    const store = this.getFlux().store('ConnectionStore');

    return {
      rules: store.rules,
      isValid: store.isValid,
      isBemDetected: store.isBemDetected,
      loading: store.loading,
      error: store.error,
    };
  },

  render() {
    const { rules, loading, error, isBemDetected, isValid } = this.state;

    return (
      <div className="main-container">
        <div className="col-md-6 col-md-push-3">
          <div className="panel panel-default no-connection">
            <div className="panel panel-heading">
              <h3 className="panel-title">CSS BEM validator</h3>
            </div>
            <div className="panel-body">
              {!loading && error && <h4>Any error occured</h4>}
              {loading && <h4>Loading...</h4>}
              {!loading && rules.length > 0 && !error && isBemDetected && !isValid && (
                <div>
                  <div>
                    <h4>Invalid rules:</h4>
                    <table className="table-responsive table-striped text-center">
                      <thead>
                        <tr>
                          <td>Missing class</td>
                          <td>Selector</td>
                        </tr>
                      </thead>
                      <tbody>
                        {rules.map(({ missingClassName, selector }, index) => (
                          <tr key={`rulesList-${index}`} className="danger">
                            <td>
                              <strong>{missingClassName}</strong>
                            </td>
                            <td>
                              <a onClick={() => this.getFlux().actions.click(selector)}>
                                <em>{selector}</em>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {!loading && !error && isBemDetected && isValid && <h4>Valid! No BEM errors found!</h4>}
              {!loading && !error && !isBemDetected && !isValid && <h4>No BEM classes detected! Nothing to lint!</h4>}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Main;
