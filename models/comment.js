var mongoose = require('../database').mongoose,
	Schema = mongoose.Schema;

var schema = {
	comment : {
		type : String,
		required : true
	},
	storyId : {
  		type: Schema.Types.ObjectId,
  		ref: 'Story',
  		required: true 
  	},
  	userId : {
  		type: Schema.Types.ObjectId,
  		ref: 'User',
  		required: true
  	},
	createdOn : {
		type : Date,
		default: Date.now
	}
};

var commentSchema = new mongoose.Schema(schema);

var Comment = mongoose.model('Comment', commentSchema);

exports.Comment = Comment;