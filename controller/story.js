var Story = require('../models/story').Story,
	validator = require("../validator/story");

exports.add = {
	auth : {
		strategy : 'token'
	},
	validate : validator.add(),
    handler  : function (request, reply) {
        var story = new Story(request.payload);
		story.saveAsync();
		reply(story);
    }
};

exports.list = {
    handler  : function (request, reply) {
		Story.find({})
			.execAsync()
			.then(function(stories) {
				reply(stories);
			})
			.catch(function(e) {
				reply({'msg' : 'Cannot fetch storeis','error' : e});
			});
    }	
};