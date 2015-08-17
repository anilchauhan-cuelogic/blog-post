var Comment = require('../models/comment').Comment,
	validator = require("../validator/story"),
	_         = require('lodash');

exports.add = {
	auth : {
		strategy : 'token'
	},
	validate : validator.addComment(),
    handler  : function (request, reply) {
    	request.payload.userId = request.payload.userId = request.auth.credentials.userId;
    	
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
			.lean()
			.execAsync()
			.then(function(comments) {
				var storyComments = _.map(comments, function(comment) {
										return _.pick(comment, ['_id', 'comment', 'storyId']); 
									});
				reply(storyComments);
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch story comments','error' : e});
			});
    }	
};