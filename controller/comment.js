var Comment = require('../models/comment').Comment,
	validator = require("../validator/story");

exports.add = {
	// auth : {
	// 	strategy : 'token'
	// },
	validate : validator.addComment(),
    handler  : function (request, reply) {
    	console.log(request.payload);
        var comment = new Comment(request.payload);
		comment.saveAsync();
		reply(comment);
    }
};

// exports.get = {
//     handler  : function (request, reply) {
// 		Comment.find({'storyId':request.params.id})
// 			.execAsync()
// 			.then(function(comments) {
// 				reply(comments);
// 			})
// 			.catch(function(e) {
// 				reply({'msg' : 'Cannot fetch story comments','error' : e});
// 			});
//     }	
// };