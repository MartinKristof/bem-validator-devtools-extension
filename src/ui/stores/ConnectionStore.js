var Fluxxor = require("fluxxor");

var ConnectionStore = Fluxxor.createStore({
  actions: {
    saveStyles: "onSaveStyles"
  },

  initialize: function() {
    this.styles = [];
  },

  onSaveStyles: function(styles) {
    styles.then(styles => {
        this.styles = styles;
        this.emit("change");
    });
  }
});

module.exports = ConnectionStore;
