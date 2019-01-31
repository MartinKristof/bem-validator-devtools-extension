var Fluxxor = require("fluxxor");

var ConnectionStore = Fluxxor.createStore({
  actions: {
    saveLintedRules: "onSaveLintedRules",
    loading: "onLoading",
    errorOccurred: "onErrorOccurred"
  },

  initialize: function() {
    this.rules = [];
    this.loading = true;
    this.error = null;
    this.isValid = false;
    this.isBemDetected = false;

    this.emit("change");
  },

  onSaveLintedRules: function({ rules, isBemDetected, isValid }) {
    this.loading = false;
    this.rules = rules;
    this.isBemDetected = isBemDetected;
    this.isValid = isValid;

    this.emit("change");
  },

  onLoading: function() {
    this.rules = [];
    this.loading = true;
    this.isBemDetected = false;
    this.isValid = false;
    this.error = null;

    this.emit("change");
  },

  onErrorOccurred: function(error) {
    this.rules = [];
    this.loading = false;
    this.isBemDetected = true;
    this.isValid = false;
    this.error = error;

    this.emit("change");
  }
});

module.exports = ConnectionStore;
