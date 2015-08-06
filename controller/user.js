var validator = require("../validator/user"),
	User = require('../models/user').User;

exports.register = {
	validate : validator.register(),
    handler  : function (request, reply) {
        
		validator.checkEmailExists(request, function (err, message){
			
			if(err) reply(err);
			
			if(message.status == 'available'){
				
				var user = new User(request.payload);
				
				user.saveAsync()
					.then(function() {
						reply({status: 'success'});
					})
					.catch(function(e) {
						reply(e);
					});
			}
		});
    }	
};

exports.list = {
    handler  : function (request, reply) {
		User.find({})
			.execAsync()
			.then(function(users) {
				reply(users);
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch users','error' : e});
			});
    }	
};