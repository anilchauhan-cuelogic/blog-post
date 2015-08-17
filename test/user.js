var server = require('../app');
var assert = require('assert');
var request = require('supertest');
var url = 'http://localhost:8000';

describe('register', function() {
  
  it('should return error saying firstname is not allowed be empty', function(done) {

    var user = {
      fname: '',
      lname: 'chauhan',
      email: 'anil.chauhancue@logic.o.in',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
     
      assert.equal(400, res.status);
      done();

    });
  });

  it('should return error saying email must be a valid email', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'testemail',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {

      assert.equal(400, res.status);
      done();

    });
  });

    it('should return error saying password is not allowed to be empty', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.chauhan@cuelogic.co.in',
      password: ''
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
        
      assert.equal(400, res.status);
      done();

    });
  });

  // it('should return error saying email is already in use', function(done) {

  //   var user = {
  //     fname: 'anil',
  //     lname: 'chauhan',
  //     email: 'anil.chauhan@cuelogic.co.in',
  //     password: '123456'
  //   };
  
  //   request(url).post('/register').send(user).end(function(err, res) {
      
  //     if (err) {
  //       throw err;
  //     }
        
  //     assert.equal('This email is already used', res.text);
  //     done();

  //   });
  // });

  it('should return error saying password should be atleast 6 characters', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.chauhan@cuelogic.co.in',
      password: 'test1'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
        
      assert.equal(400, res.status);
      done();

    });
  });

  // it('should add user', function(done) {

  //   var user = {
  //     name : { 
  //       firstname: 'anil',
  //       lastname: 'chauhan',
  //     },
  //     email: 'ani78l5.te1st112585588566655776665p45@cuelog888ic.co.in',
  //     password: '123456'
  //   };
  
  //   request(url).post('/register').send(user).end(function(err, res) {
      
  //     if (err) {
  //       throw err;
  //     }
      
  //     var data = JSON.parse(res.text);

  //     assert.equal('success', data.status);
      
  //     done();

  //   });
  // });
}); 

describe('Get user details', function(){
  it('Should return user details', function(done){
    request(url)
      .get('/user/55c2288d63949746260cdd7f')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
    
    