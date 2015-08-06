var validator = require("../validator/authentication"),
	User = require('../models/user').User;

exports.login = {
	validate : validator.login(),
    handler  : function (request, reply) {
		reply(request.payload);
    }	
};