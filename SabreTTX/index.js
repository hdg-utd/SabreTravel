var express = require('express')
var http = require('http')
var SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight')
var oauth2 = require('simple-oauth2')
var app = express()

var base_url = 'https://api.test.sabre.com'
var if_path = '/v1/shop/flights/' // Insta flights path

var sds = new SabreDevStudioFlight({
    client_id:     'V1:zo8pnvres5owijsm:DEVCENTER:EXT',
    client_secret: 'u1GEs8rI',
    uri:           base_url,
})

app.get('/', function (req, res) {
    var params = {}
    /*
    params['origin'] = req.params['origin']
    params['dest'] = req.params['dest']
    params['departuredate'] = req.params['departuredate']
    params['returndate'] = req.params['returndate']
    */

    // For testing
    params['origin'] = 'JFK'
    params['destination'] = 'LAX'
    params['departuredate'] = '2017-07-07'
    params['returndate'] = '2017-07-08'
    params['limit'] = 10
    console.log(params)

    //console.log('request params\n' + req.params)

    sds.instaflights_search(params, function(error, data) {
        if (error) {
            // Your error handling here
            console.log(error);
        } else {
            // Your success handling here
            console.log(JSON.stringify(JSON.parse(data)));
        }
    })

    res.send('hello world')
})


// Start server
app.listen(3000)
