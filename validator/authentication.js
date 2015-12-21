var joi = require("joi"),
	User = require('../models/user').User;

exports.login = function (){

	return {
		'payload' : {
			'email' : joi.string().required(),
			'password' : joi.string().required()
		} 
	};	
};