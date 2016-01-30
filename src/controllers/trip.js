const
  // express = require('express'),
  User = require('../models/trip')

var router = express.Router()

router.route('/')
  .post(checkForUser)

router.route('/login')
  .post(updateUser)

router.route('/addfriend')
  .post(addFriend)

router.route('/seefriends')
  .get(findFriends)

router.route('/taketrip')
  .post(addTrip)

router.route('/seetrips')
  .get(findTrips)

router.route('/logout')
  .all(logoutUser)

module.exports = exports = router
