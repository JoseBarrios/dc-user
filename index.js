const Person = require('dc-person');

const roles = new Map();
roles.set(1, 'root');
roles.set('root', 1);
roles.set(2, 'admin');
roles.set('admin', 2);
roles.set(3, 'user');
roles.set('user', 3);

class User extends Person {

  static role(type){
    type = Person.isString(type)? type.toLowerCase() : type;
    return roles.get(type);
  }

  constructor(model){
    model = model || {};
    super(model);
    this.model = model;
    this.password = model.password;
    this.verified = model.verified || false;
    this.role = model.role || 0; //root, admin, user, public
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
          this.model.role = 1;
          break;

        case 'admin':
          this.model.role = 2;
          break;

        default:
          //User
          this.model.role = 3;
      }
    } else if(User.isNumber(value) && value >= 0 && value <= 4){
      //Public
      this.model.role = value;
    } else {
      this.model.role = 3;
    }
  }

  //Retuns a user without private
  //variables, like password
  clean(){
    let user = this.model;
    delete user.password;
    return user;
  }
}




module.exports = User;
