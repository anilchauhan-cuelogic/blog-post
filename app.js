var hapi = require('hapi');
var config = require('./config');
var routes = require('./routes');

var server = new hapi.Server();
server.connection({ 
    host: config.server.host, 
    port: config.server.port
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route(routes.endpoints);