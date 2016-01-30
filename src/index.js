const
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  PORT = 3000,
  app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public/views'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))

app.listen(PORT, function(){
  console.log('Caravan server running at Port', PORT)
})
