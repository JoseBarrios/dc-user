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

describe('user.verifiedEmail', function() {
	it('should return the given and family names in a single string', function() {
		assert.equal(user.verifiedEmail, false);
    user.verifiedEmail = true;
		assert.equal(user.verifiedEmail, true);
    user.verifiedEmail = false;
		assert.equal(user.verifiedEmail, false);
    user.verifiedEmail = '';
		assert.equal(user.verifiedEmail, false);
    user.verifiedEmail = null;
		assert.equal(user.verifiedEmail, false);
    user.verifiedEmail = 1;
		assert.equal(user.verifiedEmail, false);
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
