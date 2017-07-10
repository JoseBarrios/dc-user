const Person = require('@josebarrios/person');
const bcrypt = require('bcryptjs');

class User extends Person {


  constructor(model){
    model = model || {};
    super(model);

    this.password = model.password;
    this.verified = model.verified || false;
    this.role = model.role; //root, admin, user, public
  }

  get password(){ return this.computed.password; }
  set password(value){
    if(User.isString(value) || User.isNumber(value)){
      this.computed.password = value;
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

  get role(){ return this.computed.role; }
  set role(value){
    if(User.isString(value)){
      switch(value.toLowerCase()){
          case 'root':
            this.computed.role = 3;
          break;

          case 'admin':
            this.computed.role = 2;
          break;

          case 'user':
            this.computed.role = 1;
          break;

          default:
          //Public
          this.computed.role = 0;
      }
    } else {
      //Public
      this.computed.role = 0;
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
