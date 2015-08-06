var user = require('./controller/user');
var authentication = require('./controller/authentication');

exports.endpoints = [
    
    { method: 'POST',   path: '/register',    config: user.register },
    { method: 'GET',   path: '/listusers',    config: user.list },
    { method: 'POST',   path: '/login',       config: authentication.login }
];

