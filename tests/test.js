'use strict'

var config = require('../config/config.json')
var Mongo = require('@josebarrios/mongo-api');
var mongo = new Mongo(config.url)

var assert = require('assert');
var User = require('../index.js');

var model = {};
model.givenName = 'jose';
model.familyName = 'barrios';
model.email = 'jose@barrios.io';
model.affiliation = {};
model.affiliation.name = 'BeVisible';
model.vatID = 1234;
model.password = ''
let user = new User(model);


var key = {};
key.fullName = 'Jose Barrios';
key.ID = null;
key.email = null;


describe('User.insert', function() {
	it('should add user to DB', function() {
    return User.insert(model, mongo).then(userID => {
      assert.ok(userID);
      key.ID = userID;
    });
	});
});

describe('User.getByID', function() {
	it('should return user', function() {
    return User.getByID(key.ID, mongo).then(user => {
      key.email = user.email;
      assert.equal(user.email, key.email);
    });
	});
});

describe('User.getByEmail', function() {
	it('should return user by email', function() {
    return User.getByEmail(key.email, mongo).then(user => {
      assert.equal(user.email, key.email);
    });
	});
});

describe('user.fullName', function() {
	it('should return the given and family names in a single string', function() {
		assert.equal(user.fullName, key.fullName);
	});
});
