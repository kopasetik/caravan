const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  password: String,
  email: String,
  friends: [{
    userId: Schema.Types.ObjectId
  }],
  photoUrl: String
})

module.exports = mongoose.model('User', UserSchema)
