var Promise = require('bluebird'),
    redis = require('redis'),
    config = require('../config'),
    client = Promise.promisifyAll(redis.createClient(config.redis.port,config.redis.host, {no_ready_check: true})),
    jwt = require('jsonwebtoken'),
    privateKey = config.key.privateKey;

module.exports = {
	createToken : createToken,
	clearToken : clearToken,
	client : client,
	validate : validate,
	invalidate : invalidate
};

client.auth(process.env.REDIS_PASSWORD, function (err) {
    if (err) {
      console.log(err);    
    } 
});

client.on('connect', function() {
    console.log('Connected to Redis Server');
});

function createToken(userObj) {
  
	var authObj = {'userId' : userObj.id},
		token1 = jwt.sign(authObj, privateKey),
		token2;

	authObj.token = token1;
	token2 = jwt.sign(authObj, privateKey);
	client.HMSET(token1,authObj);
	return token2;
}

function clearToken(token) {
  
	return new Promise(function(resolve, reject) {

		jwt.verify(token,privateKey,function(err,decoded) {

			if(err) {
				return;
			}

			client.del(decoded.coreToken);

			resolve();

		});

	});

}

function validate(decodedToken, callback) {

    client.HGETALL(decodedToken.token,function(err,credentials) {

        if (!credentials || err) {
            return callback(err, false, credentials);
        }

        return callback(null, true, credentials)
    });

};

function invalidate(decodedToken,callback) {

    client.EXISTS(decodedToken.token,function(err,credentials) {

        if (!credentials || err) {
            return callback(null,true,{});
        }

        client.del(decodedToken.token);
        callback(null,true,{});

    });
};