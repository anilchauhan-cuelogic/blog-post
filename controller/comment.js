var Comment = require('../models/comment').Comment,
	validator = require("../validator/story");

exports.add = {
	auth : {
		strategy : 'token'
	},
	validate : validator.addComment(),
    handler  : function (request, reply) {
    	request.payload.userId = request.payload.userId = request.auth.credentials.userId;
    	console.log(request.payload);
        var comment = new Comment(request.payload);
		comment.saveAsync()
			 .then(function(comment){
			 	reply(comment);
			 })
			 .catch(function(e){
			 	reply({'msg' : 'Cannot add comment','error' : e});
			 });
    }
};

exports.get = {
	auth : {
		strategy : 'token'
	},
	validate : validator.getComments(),
    handler  : function (request, reply) {
    	
		Comment.find({'storyId':request.params.id})
			.execAsync()
			.then(function(comments) {
				reply(comments);
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch story comments','error' : e});
			});
    }	
};