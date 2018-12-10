var Fluxxor = require("fluxxor");


var ConnectionStore = Fluxxor.createStore({
  actions: {
    saveStyles: "onSaveStyles",
    refresh: "onRefresh",
  },

  initialize: function() {
    this.styles = [];
    this.fetched = false;
  },

  onSaveStyles: function(styles) {
    this.fetched = true;
    styles.then(styles => {
        this.styles = styles;
        this.emit("change");
    });
  },

  onRefresh: function () {
    this.styles = [];
    this.fetched = false;

    this.emit('change')
  },
});

module.exports = ConnectionStore;
