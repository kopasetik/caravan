const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TripSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  location: String,
  description: String,
  duration: Number,
  price: Number,
  distance: Number,
  reviews:[{
    reviewer: ObjectId,
    rating: Number,
    text: String
  }],
  members: [{
    userId: ObjectId
  }]
})

// don\'t include cars. they\'ll be an api call

module.exports = mongoose.model('Trip', TripSchema)
