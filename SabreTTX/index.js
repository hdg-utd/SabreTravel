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
    params['destination'] = req.params['destination']
    params['departuredate'] = req.params['departuredate']
    params['returndate'] = req.params['returndate']
    params['limit'] = 5
    */

    // For testing
    params['origin'] = 'JFK'
    params['destination'] = 'LAX'
    params['departuredate'] = '2017-07-07'
    params['returndate'] = '2017-07-08'
    params['limit'] = 10

    //console.log('request params\n' + req.params)

    sds.instaflights_search(params, function(error, data) {
        if (error) {
            // Your error handling here
            console.log(error);
        } else {
            // Your success handling here
            var json = JSON.parse(data)['PricedItineraries'];
            var res = {}

            // Fill ticket info for each flight itenerary
            for (i = 0; i < json.length; i++) {
                console.log( json[i] );
                console.log( json[i]['AirItineraryPricingInfo']
                        ['PTC_FareBreakdowns']['PTC_FareBreakdown']
                        ['PassengerFare']['TotalFare']['Amount'] );
                console.log( json[i]['AirItinerary']['OriginDestinationOptions']
                        ['OriginDestinationOption'].length );
            }
            //console.log(get_weekends(new Date('2017-07-07'), new Date('2017-07-16')))
        }
    })

    res.send('hello world')
})

var get_weekends = function (start, end) {
    weekend_dates = [];
    d = start

    while (d < end) {
        var day = d.getDay();
        console.log(day);

        // If day is a weekend
        if ( (day === 6) || (day === 0) ) {
            console.log(new Date(d.getTime()) );
            weekend_dates.push(new Date(d.getTime()) );
        }

        d.setDate(d.getDate() + 1);
    }

    return weekend_dates
}


// Start server
app.listen(3000)
