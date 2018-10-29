'use strict'
var assert = require('assert');
var User = require('../index.js');

var model = {};
model.givenName = 'Jose';
model.familyName = 'Barrios';
model.email = 'jose@barrios.io';
model.password = 'abc123'
let user = new User(model);

var key = {};
key.fullName = 'Jose Barrios';
key.email = null;

describe('user.role', function() {
	it('should set user role to user by default', function() {
    //Public
    assert.equal(user.role, 0);
    user.role = 'root';
    assert.equal(user.role, 1);
    user.role = 'admin';
    assert.equal(user.role, 2);
    user.role = 'user';
    assert.equal(user.role, 3);
	});
});

describe('user.password', function() {
	it('should store user password', function() {
    assert.equal(user.password, model.password);
	});
});

describe('user.fullName', function() {
	it('should return the given and family names in a single string', function() {
		assert.equal(user.fullName, key.fullName);
		console.log(user.fullName)
	});
});

describe('user.verified', function() {
	it('should return the given and family names in a single string', function() {
		assert.equal(user.verified, false);
    user.verified = true;
		assert.equal(user.verified, true);
    user.verified = false;
		assert.equal(user.verified, false);
    user.verified = '';
		assert.equal(user.verified, false);
    user.verified = null;
		assert.equal(user.verified, false);
    user.verified = 1;
		assert.equal(user.verified, false);
	});
});

describe('#clean', function() {
	it('should return the user object, minus password', function() {
		assert.equal(user.clean().password, undefined);
	});
});

