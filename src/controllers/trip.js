const
  Promise = require('bluebird'),
  express = require('express'),
  Trip = require('../models/trip'),
  User = require('../models/user'),
  ObjectId = require('mongoose').Types.ObjectId,
  expedia = Promise.promisifyAll(require('../api/expedia')),
  async = require('async')

const router = express.Router()

// GET /api/trips/seetrips
router.route('/seetrips')
  .get(findTrips)

// GET /api/trips/seetrips/Denver
router.route('/seetrips/:city')
  .get(fetchCityTrips)

// GET /api/trips/seetrips/Denver/cars
router.route('/seetrips/:city/cars')
  .get(fetchCars)

// GET /api/trips/init/Denver
router.route('/init/:city')
  .get(populateTripCollection)

// GET /api/trips/43
router.route('/:id')
  .get(findTrip)

// POST /api/trips/43/addmember
router.route('/:id/addmember')
  .post(addMember)

// GET /api/trips/43/members
router.route('/:id/members')
  .get(findMembers)


// GET /api/trips/43/confirm
router.route('/:id/confirm')
  .get(confirmTrip)

// router.route('/addreview')
//   .post(sendReview)
//
// router.route('/seereviews')
//   .get(findReviews)


module.exports = exports = router

// GET /api/trips/43
function findTrip(req, res) {
  const id = req.params.id
  expedia.tripDetails({id}, (err, body) => {
    res.send(JSON.parse(body))
  })
}

// POST /api/trips/43/addmember
function addMember(req, res) {
  const
    id = new ObjectId(req.params.id) /*,
    email = req.session.email*/
  User.findOne({email: 'joshuahou@gmail.com'}, (error, doc) => {
    const {id: userId} = doc
    Trip.findOneAndUpdate(
      {'_id': id},
      {$push: {members: {userId: userId}}},
      {safe: true, upsert: true, new: true}, (err) => {
      if (err) return res.status(500).send(err)
      res.send('successfully updated')
    })
  })
}

// GET /api/trips/43/members
function findMembers(req, res) {
  res.send('yo dog')
}

// GET /api/trips/seetrips/Denver/cars
function fetchCars(req, res){
  const city = req.params.city.toLowerCase()
  expedia.getAirport(city, body => {
    expedia.getCars(body.sr[0].a, (cars)=>{
      res.send(cars.CarInfoList.CarInfo)
    })
  })
}

// GET /api/trips/seetrips/Denver
function fetchCityTrips(req, res){
  const city = req.params.city.toLowerCase()
    expedia.tripFind(city, ({activities}) => {
      res.send(activities)
    })

}

// GET /api/trips/seetrips
function findTrips(req, res) {
  const city = 'Denver'
  expedia.tripFind(city, ({activities}) => {
    res.send(activities.map(({title: name, duration='3h', distance='5 mi', imageUrl, fromPrice: price}) => {
      return {name, duration, price, location:city, distance, imageUrl }
    }))
  })
}

// GET /api/trips/init/Denver
function populateTripCollection(req, res){
  const city = req.params.city
  expedia.tripFind(city, ({activities}) => {
    // res.send(activities)
    async.mapSeries(activities, ({title: name, duration='3h', distance='5 mi', imageUrl, fromPrice: price}, next) => {
      Trip.create(
        {name, duration, price, location:city, distance, imageUrl },
        (err, trip) => {
          if (err) return res.status(500).send(err)
          // res.send(trip)
          return console.log(trip)
        })
    })
    // async.mapSeries(activities, expedia.tripDetails, (err, results) => {
    //     let bigChunk = results.join("")
    //     bigChunk = JSON.parse(bigChunk)
    //     res.end(bigChunk)
    // })
  })
}

// GET /api/trips/43/confirm
function confirmTrip(req, res) {
  res.send('yo dog')
}
