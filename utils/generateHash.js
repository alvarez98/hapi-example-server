const bcrypt = require('bcrypt')
module.exports = {
  generateHash: function(password, saltRounds) {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
  }
}
