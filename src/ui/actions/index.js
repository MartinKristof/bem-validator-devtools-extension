module.exports = {
  saveStyles: function(styles) {
    this.dispatch("saveStyles", styles);
  },

  refresh: function() {
    this.dispatch("refresh");
  },
};
