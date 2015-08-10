var User = require('../models/user').User,
	promise = require('bluebird'),
	validator = promise.promisifyAll(require("../validator/user"));

exports.register = {
	validate : validator.register(),
    handler  : function (request, reply) {
        
        validator.checkEmailExistsAsync(request)
    			.then(function(){
    				var user = new User(request.payload);
    				return user.saveAsync();
    			})	
    			.then(function() {
					//reply({status: 'success'});
					console.log({status: 'success'});
    			})
    			.catch(function(err){
    				//reply(err);
    				console.log(err);
    			});
		
    }	
};

exports.details = {
	auth : {
		strategy : 'token'
	},
    handler  : function (request, reply) {
    	
		User.findByIdAsync(request.params.id)
			.then(function(user){
				
				if(!user) {
					return reply('User not found');
				}

				reply({
					'id':user._id, 
					'email':user.email, 
					'firstname': user.name.firstname, 
					'lastname': user.name.lastname
				});
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch user','error' : e});
			})
    }
};

exports.list = {
    handler  : function (request, reply) {
		User.find({})
			.execAsync()
			.then(function(users) {
				reply(users);
				//return users;
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch users','error' : e});
			});
    }	
};