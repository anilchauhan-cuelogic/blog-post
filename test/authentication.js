var server = require('../app');
var assert = require('assert');
var request = require('supertest');
var url = 'http://localhost:8000';

describe('login', function() {

	it('It should return - email is not allowed to be empty', function(done) {

		var credentials = {
			email: '',
			password: '123456'
		};

		request(url).post('/login').send(credentials).end(function(err, res) {

			assert.equal(400, res.status);
			done();

		});
	});

	it('It should return - password is not allowed to be empty', function(done) {

		var credentials = {
			email: 'a.cn@test.com',
			password: ''
		};

		request(url).post('/login').send(credentials).end(function(err, res) {

			assert.equal(400, res.status);
			done();

		});
	});

	it('It should return-User with this email does not exist', function(done) {

	    var credentials = {
	      email: 'adas.asd@sdfdsf.com',
	      password: '123456'
	    };
  
	    request(url).post('/login').send(credentials).end(function(err, res) {
	      
	      assert.equal(200, res.status);
	      assert.equal('User with this email does not exist', res.text);
	      done();

	    });
  	});

	it('It should return-Invalid password', function(done) {

		var credentials = {
			email: 'a.cn@test.com',
			password: 'sdfds'
		};

		request(url).post('/login').send(credentials).end(function(err, res) {
			
			if(err) throw(err);

			assert.equal(200, res.status);
			assert.equal('Invalid password', res.text);
			done();

		});
	});

	it('It should return token', function(done) {

		var credentials = {
			email: 'a.cn@test.com',
			password: '123456'
		};

		request(url).post('/login').send(credentials).end(function(err, res) {
			
			if(err) throw(err);

			var data = JSON.parse(res.text);
			
			assert.equal(200, res.status);
			assert.equal('Invalid password', res.text);
			done();

		});
	});
});