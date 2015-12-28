var joi = require("joi"),
	User = require('../models/user').User,
	promise = require('bluebird');

exports.register = function (){

	return {
		'payload' : {
			'name' : joi.object().keys({
				'firstname' : joi.string().required(),
				'lastname' : joi.string().required()
			}),
			'email' : joi.string().email().required(),
			'password' : joi.string().min(6).max(15).required(),
			'scope' : joi.array().required()
		} 
	};	
};

exports.checkEmailExists = function(request) {

	return new promise(function (resolve, reject){
		
		var email = request.payload.email;

		User.findOne({'email' : email})
			.execAsync()
			.then(function(user) {
				if(user) {
					reject(new Error('User with same email already exists'));
				} else {
					var user = new User(request.payload);
		    		user.saveAsync();
					resolve(user);
				}
			})
			.catch(function(err){
				console.log('this is an error');
				reject(err);
			});
	});
	
};