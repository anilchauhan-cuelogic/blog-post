var joi = require("joi");

exports.add = function (){

	return {
		'payload' : {
			'title' : joi.string().required(),
			'description' : joi.string().required()
		} 
	};	
};

exports.addComment = function (){

	return {
		'payload' : {
			'comment' : joi.string().required(),
			'storyId' : joi.required()
		} 
	};	
};

exports.getComments = function (){

	return {
		'params' : {
			'id' : joi.string().required()
		} 
	};	
};
