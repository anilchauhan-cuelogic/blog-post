var user = require('./controller/user');
var authentication = require('./controller/authentication');
var story = require('./controller/story');
var comment = require('./controller/comment');

exports.endpoints = [
    
    { method: 'POST',   path: '/register',    config: user.register },
    { method: 'GET',   path: '/listusers',    config: user.list },
    { method: 'POST',   path: '/login',       config: authentication.login },
    { method: 'GET',   path: '/user/{id}',    config: user.details },
    { method: 'POST',   path: '/story',    config: story.add },
    { method: 'GET',   path: '/liststories',    config: story.list },
    { method: 'POST',   path: '/comment',    config: comment.add }
    //{ method: 'GET',   path: '/story/{id}',    config: comment.get }

];

