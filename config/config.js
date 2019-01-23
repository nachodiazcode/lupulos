var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'lapilsenappfinal'
    },
    port: 3000,
    db: 'mongodb://localhost/lupulos'
  },

  test: {
    root: rootPath,
    app: {
      name: 'lapilsenappfinal'
    },
    port: 3000,
    db: 'mongodb://localhost/lupulos'
  },

  production: {
    root: rootPath,
    app: {
      name: 'lapilsenappfinal'
    },
    port: 3000,
    db: 'mongodb://localhost/lupulos'
  }
};

module.exports = config[env];
