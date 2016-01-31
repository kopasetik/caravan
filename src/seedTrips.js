const
  Promise = require('bluebird'),
  express = require('express'),
  Trip = require('./models/trip'),
  User = require('./models/user'),
  ObjectId = require('mongoose').Types.ObjectId,
  expedia = Promise.promisifyAll(require('./api/expedia')),
  async = require('async'),
  fs = require('fs')

const city = process.argv[2].toLowerCase()
// expedia.tripPipe(city, fs.createWriteStream, '../newTrips.json')

expedia.tripFind(city, ({activities}) => {
  fs.writeFileSync('../' + city + '.json', JSON.stringify(activities.map(({title: name, duration='3h', distance='5 mi', imageUrl, fromPrice: price}) => {
    return {name, duration, price, location:city, distance, imageUrl }
  })))
})
