const
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  PORT = 3000,
  app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public/views'))

app.listen(PORT, function(){
  console.log('Caravan server running at Port', PORT)
})
