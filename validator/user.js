var joi = require("joi"),
	User = require('../models/user').User;

exports.register = function (){

	return {
		'payload' : {
			'name' : joi.object().keys({
				'firstname' : joi.string().required(),
				'lastname' : joi.string().required()
			}),
			'email' : joi.string().email().required(),
			'password' : joi.string().min(6).max(15).required()
		} 
	};	
};

exports.checkEmailExists = function(request,callback) {

	var email = request.payload.email;
	
	User.findOne({'email' : email})
		.execAsync()
		.then(function(user) {

			if(user) {

				callback(null, {status: 'User with same email already exists'});
				return;

			}

			callback(null, {status: 'available'});
			return;

		})
		.catch(function(e) {

			callback(e);

		});
};