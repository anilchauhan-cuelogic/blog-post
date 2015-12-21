var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var config = require('./config');

mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
	console.log('connected to mongodb');
});

exports.mongoose = mongoose;
exports.db = db;