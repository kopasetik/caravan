const
  express = require('express'),
  express = require('express-session'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  path = require('path'),
  PORT = 3000,
  app = express()

mongoose.connect('mongodb://localhost/expedia')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public/views'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))

app.use('/api/users', require())

app.listen(PORT, function(){
  console.log('Caravan server running at Port', PORT)
})
