var mongoose = require('../database').mongoose,
	Schema = mongoose.Schema;

var schema = {
	title : {
		type : String,
		required : true
	},
	description : {
    	type : String,
    	unique : true
  	},
  	userId : {
  		type: Schema.Types.ObjectId,
  		ref: 'User',
  		required: true
  	},
	createdOn : {
		type : Date,
		default: Date.now
	},
	updatedOn : {
		type : Date,
		default: Date.now
	}
};

var storySchema = new mongoose.Schema(schema);

var Story = mongoose.model('Story', storySchema);

exports.Story = Story;
