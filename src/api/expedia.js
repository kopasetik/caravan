const
  Promise = require('bluebird'),
  apiCode = require('../../api_env.js')['expedia']

const
  http = Promise.promisifyAll(require('http')),
  https = Promise.promisifyAll(require('https')),
  request = Promise.promisify(require('request')),
  expedia = {}

expedia['tripFind'] = (locale, next) => {
  // Promise
  request({json: true, uri: `http://terminal2.expedia.com/x/activities/search?location=${locale}&apikey=${apiCode.key}`})
    .then(res=> {
      next(null, res.body.activities)
    })
    .catch(e=>console.error(e))
}

expedia['tripDetails'] = (item, next) => {
  let myChunk
  request.get('http://terminal2.expedia.com/x/activities/details?activityId=' + item.id + '&apikey=' + apiCode.key, (err, res, body)=>{
    if (err) return console.log(err)
    // item['description'] = JSON.parse(body).description
  })
  .on('response', function (response) {
    let body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      next(null, body);
    });
  }).end();
  // .pipe((blah)=> {
  //   console.log(blah)
  // })
}

expedia['tripPipe'] = (metro, next, filename) => {
  request.get('http://terminal2.expedia.com/x/activities/search?location=' + metro + '&apikey=' + apiCode.key, (err, res, body)=>{

  })
  .pipe(next(filename))
}

expedia['getAirport'] = (metro, next) =>{
  request.get('http://terminal2.expedia.com/x/suggestions/regions?query=' + metro + '&apikey=' + apiCode.key, (err, res, body)=>{
    next(JSON.parse(body))
  })
}

expedia['getCars'] = (airport, next) => {
  request.get('http://terminal2.expedia.com/x/cars/search?pickupdate=2016-03-21T10:00&dropoffdate=2016-03-28T16:30&pickuplocation=' + airport + '&dropofflocation=' + airport + '&sort=price&limit=10&apikey=' + apiCode.key, (err, res, body) => {
    next(JSON.parse(body))
  })
}

module.exports = expedia
