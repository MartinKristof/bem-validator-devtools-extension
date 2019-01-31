import { inspect } from '../inspect';

module.exports = {
  saveLintedRules(rules) {
    this.dispatch('saveLintedRules', rules);
  },

  loading() {
    this.dispatch('loading');
  },

  errorOccurred() {
    this.dispatch('errorOccurred');
  },

  click(selector) {
    inspect(selector);
  },
};
