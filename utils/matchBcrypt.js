const bcrypt = require('bcrypt')
module.exports = {
  matchData: async function matchData (hash, password) {
    return bcrypt.compare(password, hash)
  }
}
