var Story = require('../models/story').Story,
	validator = require("../validator/story"),
	Comment = require('../models/comment').Comment;

//Add story
exports.add = {
	auth : {
		strategy : 'token'
	},
	validate : validator.add(),
    handler  : function (request, reply) {
    	request.payload.userId = request.auth.credentials.userId;
        var story = new Story(request.payload);
		story.saveAsync()
			 .then(function(story){
			 	reply({id: story._id});
			 })
			 .catch(function(e){
			 	reply({'msg' : 'Cannot add story','error' : e});
			 });
    }
};

//Lists all stories
exports.list = {
    handler  : function (request, reply) {
		Story.find({})
			.execAsync()
			.then(function(stories) {
				reply(stories);
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch stories','error' : e});
			});
    }	
};

exports.edit = {
	auth : {
		strategy : 'token'
	},
	validate : validator.add(),
    handler  : function (request, reply) {
		Story.findByIdAndUpdateAsync(
				request.params.id, {
				$set : {
					title : request.payload.title,
					description : request.payload.description,
					updatedOn : new Date()
				}
			})
			.then(function(story){
			 	reply({success : 'success'});
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot find story','error' : e});
			});
    }	
};

exports.delete = {
	auth : {
		strategy : 'token'
	},
	handler : function(request, reply) {
		Story.findByIdAndRemoveAsync(request.params.id)
			 .then(function(story){
			 	reply({status: 'object removed'});

			 })
 			 .catch(function(e){
 			 	reply({'msg' : 'Cannot find story','error' : e});
 			 });
	}
}