'use strict'
var assert = require('assert');
var User = require('../index.js');

var model = {};
model.givenName = 'jose';
model.familyName = 'barrios';
model.email = 'jose@barrios.io';
model.password = 'abc123'
let user = new User(model);

var key = {};
key.fullName = 'Jose Barrios';
key.email = null;

describe('user.password', function() {
	it('should hash user password', function() {
    assert.notEqual(user.password, model.password);
	});
});

describe('user.fullName', function() {
	it('should return the given and family names in a single string', function() {
		assert.equal(user.fullName, key.fullName);
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

describe('#passwordEquals', function() {
	it('should return true if unhashed password matches hashed password', function() {
		assert.equal(user.passwordEquals(model.password), true);
    assert.equal(user.passwordEquals('should not match'), false);
	});
});
