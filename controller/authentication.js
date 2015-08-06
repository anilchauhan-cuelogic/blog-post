var validator = require("../validator/authentication"),
	User = require('../models/user').User,
	auth = require('../utils/auth');

exports.login = {
	validate : validator.login(),
    handler  : function (request, reply) {
		
		// User.findOne({ email: request.payload.email })
		// 	.execAsync()
		// 	.then(function(user){
		// 		if(user){
		// 			return user.comparePasswordAsync(request.payload.password);
		// 		} else {
		// 			reply("User with this email does not exist");
		// 		}
		// 	})
		// 	.then(function(isMatch){

		// 		if(isMatch){
  //               	var token = auth.createToken({'id' : user._id});
  //               	console.log(token);
  //               } else {
  //                   reply("Invalid password");
  //               }
		// 	})
		// 	.catch(function(err){
		// 		console.log(err);
		// 		//reject(err);
		// 	});
		User.findOne({ email: request.payload.email }, function(err, user) {

            if (err) throw err;

            if(user){

                user.comparePassword(request.payload.password, function(err, isMatch) {

                    if (err) throw err; 

                    if(isMatch){

                    	var token = auth.createToken({'id' : user._id});
                    	reply(token);
                        
                    } else {
                        reply("Invalid password");
                    }
                });
            } else {
                return reply("User with this email does not exist");
            }           
        });
    }	
};