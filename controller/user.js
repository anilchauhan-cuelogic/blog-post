var User = require('../models/user').User,
	promise = require('bluebird'),
	validator = promise.promisifyAll(require("../validator/user")),
	_         = require('lodash');

exports.register = {
	validate : validator.register(),
    handler  : function (request, reply) {
        
        validator.checkEmailExistsAsync(request)
    			.then(function(user){
    				return reply({status : 'success'});
    			})
    			.catch(function(err){
    				return reply(err);
    			});
		
    }	
};

exports.details = {
	auth : {
		strategy : 'token'
	},
    handler  : function (request, reply) {
    	
		User.findOne({'_id': request.params.id})
			.lean()
			.execAsync()
			.then(function(user){
				
				if(_.isEmpty(user)) {
					return reply('User not found');
				}
				
				reply(_.omit(user, 'password'));
				
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch user','error' : e});
			})
    }
};

exports.list = {
	auth : {
		scope : ['admin']
	},
    handler  : function (request, reply) {
		User.find({})
			.lean()
			.execAsync()
			.then(function(users) {

				if(_.isEmpty(users) || !_.isArray(users)) {
					return reply('User list is empty');
				}

				var usersList = _.chain(users)
					  .sortBy('createdOn')
					  .map(function(user) {
					    	return _.omit(user, ['password', 'createdOn']);
					  	})
					  .value();

				reply(usersList);
				
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch users','error' : e});
			});
    }	
};