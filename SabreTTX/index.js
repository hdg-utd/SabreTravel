var express = require('express')
var http = require('http')
var app = express()

var base_url = 'https://api.sabre.com'

app.get('/', function (req, res) {
    //http.get({}, 
    res.send('hello world')
})


// Start server
app.listen(3000)
