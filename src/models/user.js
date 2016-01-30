const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  password: String,
  email: String,
  friends: [{
    userId: ObjectId
  }]
})

module.exports = mongoose.model('User', UserSchema)
