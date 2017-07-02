const Person = require('@josebarrios/person');
const bcrypt = require('bcryptjs');

class User extends Person {

  static hashPassword(value){
    if(User.isString(value) || User.isNumber(value)){
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(value, salt);
      return hash;
    } else {
      console.error('Password must be string or numbers')
    }
  }

  constructor(model){
    console.log(model)
    model = model || {};
    super(model);

    this.password = model.password;
    this.verifiedEmail = model.verifiedEmail;
  }

  get password(){ return this.computed.password; }
  set password(value){ this.computed.password = User.hashPassword(value); }

  get verifiedEmail(){ return this.computed.verifiedEmail; }
  set verifiedEmail(value){
    if(User.isBoolean(value)){
      this.computed.verifiedEmail = value;
    } else if(!this.computed.verifiedEmail){
      //Default to false
      this.computed.verifiedEmail = false;
    } else if(User.isEmpty(this.computed.verifiedEmail)){
      console.error("user's verifiedEmail should be boolean");
    }
  }


  //Retuns a user without private
  //variables, like password
  clean(){
    let user = User.assignedProperties(this)
    delete user.password;
    return user;
  }

  passwordEquals(value){
    return bcrypt.compareSync(value, this.password)
  }
}




module.exports = User;
