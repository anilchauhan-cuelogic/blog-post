var mongoose = require('../database').mongoose,
	bcrypt = require('bcrypt'),
	promise = require('bluebird'),
	SALT_WORK_FACTOR = 10;

var schema = {
	name : {
		firstname: {
			type : String,
			required : true
		},
		lastname : {
			type : String,
			required : true
		}
	},
	email : {
    	type : String,
    	unique : true,
    	index: { unique: true }
  	},
  	password : {
		type : String,
		required : true
	},
	createdOn : {
		type : Date,
		default: Date.now
	},
};

var userSchema = new mongoose.Schema(schema);

// on every save, add the date
userSchema.pre('save', function(next) {

	var user = this;

  	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

});

userSchema.methods.comparePassword = function(password, callback) {

	//return new Promise(function(resolve, reject) {

		bcrypt.compare(password, this.password, function(err, isMatch) {

	        if (err) return callback(err);
	        
	        callback(null, isMatch);
    	});
	//});
};

//userSchema.methods = promise.promisifyAll(userSchema.methods);

//create the model
var User = mongoose.model('User', userSchema);

exports.User = User;



