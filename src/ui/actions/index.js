import { inspect } from '../inspect';

module.exports = {
  saveLintedRules: function(rules) {
    this.dispatch('saveLintedRules', rules);
  },

  loading: function() {
    this.dispatch('loading');
  },

  errorOccurred: function() {
    this.dispatch('errorOccurred');
  },

  click: function(selector) {
    inspect(selector);
  },
};
