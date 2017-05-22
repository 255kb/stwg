let config = require('./config');

module.exports = {
  batch: [config.sourcePath + 'partials'],
  helpers: {
    text: function (key) {
      return this.texts[key] || key;
    }
  }
};
