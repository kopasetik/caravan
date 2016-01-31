const
  express = require('express'),
  Trip = require('../models/trip'),
  User = require('../models/user'),
  ObjectId = require('mongoose').Types.ObjectId

const router = express.Router()

// GET /api/trips/seetrips
router.route('/seetrips')
.get(findTrips)

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
  const id = new ObjectId(req.params.id)
  Trip.findOne({'_id': id}, (err, doc) => {
    if (err) return res.status(500).send(err)
    if (doc) return res.send(doc)
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

// GET /api/trips/seetrips
function findTrips(req, res) {
  Trip.find({}, (err, docs) => {
    if (err) return res.status(500).send(err)
    res.send(docs)
  })
}

// GET /api/trips/43/confirm
function confirmTrip(req, res) {
  res.send('yo dog')
}
