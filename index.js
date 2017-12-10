const Person = require('dc-person');

class User extends Person {


  constructor(model){
    model = model || {};
    super(model);
    this.model = model;
    this.password = model.password;
    this.verified = model.verified || false;
    this.role = model.role; //root, admin, user, public
  }

  get password(){ return this.model.password; }
  set password(value){
    if(User.isString(value) || User.isNumber(value)){
      this.model.password = value;
    }
  }

  get verified(){ return this.model.verified; }
  set verified(value){
    if(User.isBoolean(value)){
      this.model.verified = value;
    } else if(!this.model.verified){
      //Default to false
      this.model.verified = false;
    } else if(User.isEmpty(this.model.verified)){
      console.error("user's verified should be boolean");
    }
  }

  get role(){ return this.model.role; }
  set role(value){
    if(User.isString(value)){
      switch(value.toLowerCase()){
          case 'root':
            this.model.role = 3;
          break;

          case 'admin':
            this.model.role = 2;
          break;

          case 'user':
            this.model.role = 1;
          break;

          default:
          //Public
          this.model.role = 0;
      }
    } else {
      //Public
      this.model.role = 0;
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
