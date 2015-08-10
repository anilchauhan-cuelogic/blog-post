var hapi = require('hapi'),
	config = require('./config'),
	routes = require('./routes'),
	auth = require('./utils/auth'),
	privateKey = config.key.privateKey;

var server = new hapi.Server();

server.connection({ 
    host: config.server.host, 
    port: config.server.port
});

server.register(require('hapi-auth-jwt'), function (error) {

    server.auth.strategy('token', 'jwt', {
        key: privateKey,
        validateFunc: auth.validate
    });

    console.log('Authorization strategy implemented');
});

server.auth.strategy('discard-token', 'jwt', {
    key: privateKey,
    validateFunc: auth.invalidate
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route(routes.endpoints);