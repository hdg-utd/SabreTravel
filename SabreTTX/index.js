var express = require('express')
var http = require('http')
var SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight')
var oauth2 = require('simple-oauth2')
var path = require("path");
var app = express()

var TevoClient = require('ticketevolution-node');
var tkt_base_url='https://api.ticketevolution.com'
var getevents_path='/v9/events'
var tevoClient=new TevoClient({
 apiToken:'SabreHackathon:TTX2017LasVegasNV',
  apiSecretKey:'TicketEvolutionWasFoundedByBrokersIn2010',
})


var base_url = 'https://api.test.sabre.com'
var if_path = '/v1/shop/flights/' // Insta flights path

var sds = new SabreDevStudioFlight({
    client_id:     'V1:zo8pnvres5owijsm:DEVCENTER:EXT',
    client_secret: 'u1GEs8rI',
    uri:           base_url,
})

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

//app.use('/static', express.static('../app/flightPicker.html'))
app.use('/', express.static(path.join(__dirname, '../app')))

app.get('/api/flight', function (req, res) {
    var params = {}

    params['origin'] = req.query['origin']
    params['destination'] = req.query['destination']
    params['departuredate'] = req.query['departuredate']
    params['returndate'] = req.query['returndate']
    params['limit'] = 5
    
    // For testing
    /*
    params['origin'] = 'JFK'
    params['destination'] = 'LAX'
    params['departuredate'] = '2017-07-07'
    params['returndate'] = '2017-07-11'
    params['limit'] = 10
    */
    
    var js_result = [];
    
    sds.instaflights_search(params, function(error, data) {
        if (error) {
            // Your error handling here
            console.log(error);
        } else {
            // Your success handling here
            var json = JSON.parse(data)['PricedItineraries'];
                
            // Fill ticket info for each flight itenerary
            for (i = 0; i < json.length; i++) {
                // Extract depart flight info
                // --------------------------
                var df = json[i]['AirItinerary']['OriginDestinationOptions']
                        ['OriginDestinationOption'][0]['FlightSegment'];
                
                var js_res = {};
                
                js_res['DepartFlight'] = {}
                js_res['DepartFlight']['stops'] = df.length-2;
                js_res['DepartFlight']['depart_date'] = df[0]['DepartureDateTime'];
                js_res['DepartFlight']['arrival_date'] = df[df.length-1]['ArrivalDateTime'];

                // Extract return flight info
                // --------------------------
                var rf = json[i]['AirItinerary']['OriginDestinationOptions']
                        ['OriginDestinationOption'][1]['FlightSegment'];

                js_res['ReturnFlight'] = {}
                js_res['ReturnFlight']['stops'] = rf.length-2;
                js_res['ReturnFlight']['depart_date'] = rf[0]['DepartureDateTime'];
                js_res['ReturnFlight']['arrival_date'] = rf[rf.length-1]['ArrivalDateTime'];

                // Extract total fare
                // --------------------------
                js_res['TotalFare'] = json[i]['AirItineraryPricingInfo']
                        ['PTC_FareBreakdowns']['PTC_FareBreakdown']
                        ['PassengerFare']['TotalFare']['Amount'];
                
                js_result.push(js_res);
            }

        }
        res.json(js_result)
        
    })
})

app.get('/api/events',function(req,res){
    var js_res = {
        events:[]
    }
    var search_params={}
    search_params['lat']=req.query['lat']
    search_params['lon']=req.query['lon']
    search_params['within']= 20;
    search_params['occurs_at_gte']=req.query['occurs_at_gte']
    search_params['occurs_at_lt']=req.query['occurs_at_lt']

    /*
    search_params['lat']=36.1207804
    search_params['lon']=-115.156559
    search_params['within']=20
    search_params['occurs_at.gte']='2017-06-27'
    search_params['occurs_at.lt']='2017-06-28'
    */
    
    var url='https://api.sandbox.ticketevolution.com/v9/events?lat='+search_params["lat"]+'&lon='+search_params["lon"]+'&within='
    +search_params["within"]+'&occurs_at.gte='+search_params["occurs_at_gte"]+'&occurs_at.lt='+search_params["occurs_at_lt"]+'&page=1&per_page=2'
    
    var data=tevoClient.getJSON(url).then((json) => {
  
    for (i = 0; i < json.events.length; i++) {

        js_res.events.push({
            name : json.events[i].name,
            time : json.events[i].occurs_at_local,
            venue : json.events[i].venue.location,
            availableTkt : json.events[i].available_count
        });
    }
    
    res.send(js_res)
}).catch((err) => {
    console.log(err);
});
})

function get_api (addr) {
    http.get('https://maps.googleapis.com/maps/api/geocode/json?address="' + addr + '"', (res) => {
        return res['geometry']['location'];
    });
}

// Start server
app.listen(3000)
