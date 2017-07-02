const Person = require('@josebarrios/person');
const bcrypt = require('bcryptjs');

class User extends Person {

  constructor(model){
    console.log(model)
    model = model || {};
    super(model);
    this.password = model.password;
  }

  get password(){ return this.computed.password; }
  set password(value){
    if(User.isString(value) || User.isNumber(value)){
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(value, salt);
      this.computed.password = hash;
    } else {
      console.error('Password must be string or numbers')
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
