const Person = require('@josebarrios/person');
const bcrypt = require('bcryptjs');

class User extends Person {

  static hashPassword(value){
    return new Promise((resolve, reject) => {
      bcrypt.hash(value, 10, function(err, hash) {
        if(err) { reject(error) }
        else { resolve(hash) }
      });
    })
  }

  constructor(model){
    model = model || {};
    super(model);

    this.password = model.password;
    this.verified = model.verified;
  }

  get password(){ return this.computed.password; }
  set password(value){
    User.hashPassword(value)
      .then(hash => { this.computed.password = hash; })
      .catch(console.error)
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

  passwordEquals(value){
    return bcrypt.compareSync(value, this.password)
  }
}




module.exports = User;
