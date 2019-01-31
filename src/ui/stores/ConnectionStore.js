const Fluxxor = require('fluxxor');

const ConnectionStore = Fluxxor.createStore({
  actions: {
    saveLintedRules: 'onSaveLintedRules',
    loading: 'onLoading',
    errorOccurred: 'onErrorOccurred',
  },

  initialize() {
    this.rules = [];
    this.loading = true;
    this.error = null;
    this.isValid = false;
    this.isBemDetected = false;

    this.emit('change');
  },

  onSaveLintedRules({ rules, isBemDetected, isValid }) {
    this.loading = false;
    this.rules = rules;
    this.isBemDetected = isBemDetected;
    this.isValid = isValid;

    this.emit('change');
  },

  onLoading() {
    this.rules = [];
    this.loading = true;
    this.isBemDetected = false;
    this.isValid = false;
    this.error = null;

    this.emit('change');
  },

  onErrorOccurred(error) {
    this.rules = [];
    this.loading = false;
    this.isBemDetected = true;
    this.isValid = false;
    this.error = error;

    this.emit('change');
  },
});

module.exports = ConnectionStore;
