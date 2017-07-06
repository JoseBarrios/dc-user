const Person = require('@josebarrios/person');
const bcrypt = require('bcryptjs');

class User extends Person {


  constructor(model){
    model = model || {};
    super(model);

    this.password = model.password;
    this.verified = model.verified;
  }

  get password(){ return this.computed.password; }
  set password(value){
    if(User.isString(value) || User.isNumber(value)){
      this.computed.password = value;
    }else{
      console.log(`PASSWORD NOT SET:  '${value}' must be string or number`)
    }
  }

  get verified(){ return this.computed.verified; }
  set verified(value){
    if(User.isBoolean(value)){
      this.computed.verified = value;
    } else if(!this.computed.verified){
      //Default to false
      this.computed.verified = false;
    } else if(User.isEmpty(this.computed.verified)){
      console.error("user's verified should be boolean");
    }
  }


  //Retuns a user without private
  //variables, like password
  clean(){
    let user = User.assignedProperties(this)
    delete user.password;
    return user;
  }
}




module.exports = User;
