const Person = require('@josebarrios/person');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectId;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const COLLECTION_NAME = 'users';
const SALT_ROUNDS = 10;

class User extends Person {

  static insert(user, db){
    return new Promise(function(resolve, reject){
      bcrypt.hash(user.password, SALT_ROUNDS).then(function(hash) {
        user.password = hash;
        db.insertDocument(COLLECTION_NAME, user).then(result =>{
          resolve(result.insertedIds[0]);
        }).catch(reject);
      })
    })
  }

  static getByID(identification, db){
    return new Promise(function(resolve, reject){
      db.getDocumentByID(COLLECTION_NAME, identification).then(user =>{
        resolve(user);
      }).catch(reject);
    })
  }

  /**
   * returns the user document based on its email property.
   * @param  {String} email of the potential user
   * @return {Object} user or error
   */
  static getByEmail(email, db){
    let query = {};
    query.email = email;
    let projection = {};
    //projection.password = 0;
    return new Promise((resolve, reject) => {
      db.findOne(COLLECTION_NAME, query, projection).then(user =>{
        resolve(user)
      }).catch(reject)
    });
  }


  constructor(model, db){
    model = model || {};
    super(model);

    this.mongoID = model._id;
    this.collectionName = COLLECTION_NAME;
    this.password = model.password;
    if(db){ this.enableDB(db); }
  }

  get mongoID(){ return this.model.mongoID; }
  set mongoID(value){
    if(!value) return;
    this.model.mongoID = value;
  }

  enableDB(db){
    this.enabledDB = true;
    this.db = db;
  }

  disableDB(db){
    this.enabledDB = false;
    this.db = null;
  }

  save(){
    return new Promise((resolve, reject) => {
      if(this.enabledDB){
        let updates = this.serialize();
        this.db.updateDocument(this.collectionName, this.mongoID, updates).then(res => {
            if(res.ok){ resolve(res.value) }
            else { reject(res); }
        }).catch(reject)
      }else{ reject(new Error('You must first enable DB by passing it to #enableDB')); }
    })
  }

  serialize(){
    let string = JSON.stringify(this.model);
    let serial = JSON.parse(string)
    delete serial._id;
    delete serial.mongoID;
    return serial;
  }
}




module.exports = User;
