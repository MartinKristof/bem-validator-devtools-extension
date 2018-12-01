import React from "react";

var FluxMixin = require("fluxxor").FluxMixin(React);
var StoreWatchMixin = require("fluxxor").StoreWatchMixin;

const Main = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ConnectionStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("ConnectionStore");

    return {
      styles: store.styles
    };
  },

  renderNoConnection: function() {
    return (
      <div className="col-md-6 col-md-push-3">
        <div className="panel panel-default no-connection">
          <div className="panel panel-heading">
            <h3 className="panel-title">CSS BEM validator</h3>
          </div>
          <div className="panel-body">
            {this.state.styles.length ? (
              <div>
                <h4>You have to declare these CSS classes:</h4>
                <ul>
                  {this.state.styles.map((c, index) => (
                    <li key={index}>{c}</li>
                  ))}
                </ul>
              </div>
            ): <h4>No BEM errors found!</h4>}
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    return <div className="main-container">{this.renderNoConnection()}</div>;
  }
});

export default Main;
