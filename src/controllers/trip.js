const
  Promise = require('bluebird'),
  express = require('express'),
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

// GET /api/trips/43
router.route('/:id')
  .get(findTrip)

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
  const MAX_TRIPS = 20;
    expedia.tripFind(city, ({activities}) => {
      activities = activities.slice(0, MAX_TRIPS);
      res.send(activities.map(({title: name, duration='3h', distance='5 mi', imageUrl='trip_card.png', fromPrice: price, id: _id}) => {
        return {name, duration, price, location:city, distance, imageUrl, _id }
      }));
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
