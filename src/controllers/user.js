const
  express = require('express'),
  bcrypt = require('bcrypt'),
  User = require('../models/user')

var router = express.Router()

router.route('/')
  .post(checkForUser)

router.route('/login')
  .post(updateUser)

router.route('/addfriend')
  .post(addFriend)

router.route('/seefriends')
  .get(findFriends)

router.route('/logout')
  .all(logoutUser)

router.route('/signup')
  .all(createUser)

module.exports = exports = router

function checkForUser (req, res){

}

function updateUser (req, res){

}

function addFriend (req, res){

}

function findFriends (req, res){

}

function logoutUser (req, res){

}

function createUser (req, res){
  
}
