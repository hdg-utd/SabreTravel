'use strict';

var FlightInputController = sabrettx.controller('FlightInputController', function($scope, $http) {
    $scope.saveFlightData = function(flight) {
        $scope.origin = flight.origin.toUpperCase();
        $scope.destination = flight.destination.toUpperCase();
        $scope.departing = flight.departing;
        $scope.return = flight.return;
        
        $scope.flight_check = true;
        
        if(true) {
            
            var saturdayDate = flight.departing.addDays(6 - flight.departing.getDay());
            var sundayDate = saturdayDate.addDays(1);
            
            console.log(dateHttpGetFormat(saturdayDate));
            console.log(dateHttpGetFormat(sundayDate));
            
            // Initial Call
            $http({
                url: 'http://localhost:3000/api/flight',
                method: 'GET',
                params: {
                    origin: $scope.origin,
                    destination: $scope.destination,
                    departuredate: dateHttpGetFormat($scope.departing),
                    returndate: dateHttpGetFormat($scope.return)
                }
            }).then(
                function(response) {
                    $scope.flights = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Flights - Los Angeles
            $http({
                url: 'http://localhost:3000/api/flight',
                method: 'GET',
                params: {
                    origin: $scope.destination,
                    destination: 'LAX',
                    departuredate: dateHttpGetFormat(saturdayDate),
                    returndate: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellflightsLAX = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Flights - SF
            $http({
                url: 'http://localhost:3000/api/flight',
                method: 'GET',
                params: {
                    origin: $scope.destination,
                    destination: 'SFO',
                    departuredate: dateHttpGetFormat(saturdayDate),
                    returndate: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellflightsSFO = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Flights - Seattle
            $http({
                url: 'http://localhost:3000/api/flight',
                method: 'GET',
                params: {
                    origin: $scope.destination,
                    destination: 'SEA',
                    departuredate: dateHttpGetFormat(saturdayDate),
                    returndate: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellflightsSEA = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Flights - Dallas
            $http({
                url: 'http://localhost:3000/api/flight',
                method: 'GET',
                params: {
                    origin: $scope.destination,
                    destination: 'DFW',
                    departuredate: dateHttpGetFormat(saturdayDate),
                    returndate: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellflightsDFW = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Flights - Vegas
            $http({
                url: 'http://localhost:3000/api/flight',
                method: 'GET',
                params: {
                    origin: $scope.destination,
                    destination: 'LAS',
                    departuredate: dateHttpGetFormat(saturdayDate),
                    returndate: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellflightsLAS = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            
            // UpSell Events - Los Angeles
            $http({
                url: 'http://localhost:3000/api/events',
                method: 'GET',
                params: {
                    lat: "34.052234",
                    lon: "-118.243685",
                    occurs_at_gte: dateHttpGetFormat(saturdayDate),
                    occurs_at_lt: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellEventsLAX = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Events - SF
            $http({
                url: 'http://localhost:3000/api/events',
                method: 'GET',
                params: {
                    lat: "37.774929",
                    lon: "-122.419416",
                    occurs_at_gte: dateHttpGetFormat(saturdayDate),
                    occurs_at_lt: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellEventsSFO = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Events - Seattle
            $http({
                url: 'http://localhost:3000/api/events',
                method: 'GET',
                params: {
                    lat: "47.606209",
                    lon: "-122.332071",
                    occurs_at_gte: dateHttpGetFormat(saturdayDate),
                    occurs_at_lt: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellEventsSEA = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Events - Dallas
            $http({
                url: 'http://localhost:3000/api/events',
                method: 'GET',
                params: {
                    lat: "32.776664",
                    lon: "-96.796988",
                    occurs_at_gte: dateHttpGetFormat(saturdayDate),
                    occurs_at_lt: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellEventsDFW = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            // UpSell Events - Vegas
            $http({
                url: 'http://localhost:3000/api/events',
                method: 'GET',
                params: {
                    lat: "36.169941",
                    lon: "-115.139830",
                    occurs_at_gte: dateHttpGetFormat(saturdayDate),
                    occurs_at_lt: dateHttpGetFormat(sundayDate)
                }
            }).then(
                function(response) {
                    $scope.upsellEventsLAS = response.data;
                },
                function(response) {
                    console.log("Error: " + response);
                }
            );
            
            
            $scope.no_weekend = false;
            $scope.yes_weekend = true;
        } else {
            $scope.no_weekend = true;
            $scope.yes_weekend = false;
        }
        
        //console.log(countWeekendDays($scope.departing, $scope.return));
    }
    
    $scope.flight_check = false;
    $scope.no_weekend = false;
    $scope.yes_weekend = false;
    
//    $scope.flights = [
//        {
//            DepartingFlight: {
//                depart_date: '2016-08-13T18:15:00',
//                arrival_date: '2016-08-13T19:27:00',
//                stops: '0'
//            },
//            ReturnFlight: {
//                depart_date: '2016-08-15T21:45:00',
//                arrival_date: '2016-08-16T04:43:00',
//                stops: '0'
//            },
//            TotalFare: '234'
//        },
//        {
//            DepartingFlight: {
//                depart_date: '2016-08-13T10:12:00',
//                arrival_date: '2016-08-13T12:22:00',
//                stops: '0'
//            },
//            ReturnFlight: {
//                depart_date: '2016-08-15T21:45:00',
//                arrival_date: '2016-08-16T04:43:00',
//                stops: '0'
//            },
//            TotalFare: '543'
//        },
//        {
//            DepartingFlight: {
//                depart_date: '2016-08-13T18:15:00',
//                arrival_date: '2016-08-13T19:27:00',
//                stops: '0'
//            },
//            ReturnFlight: {
//                depart_date: '2016-08-15T18:45:00',
//                arrival_date: '2016-08-16T06:43:00',
//                stops: '0'
//            },
//            TotalFare: '765'
//        }
//    ];
});

function countWeekendDays( d0, d1 )
{
  var ndays = 1 + Math.round((d1.getTime()-d0.getTime())/(24*3600*1000));
  var nsaturdays = Math.floor( (d0.getDay()+ndays) / 7 );
  return 2*nsaturdays + (d0.getDay()==0) - (d1.getDay()==6);
}

function dateHttpGetFormat(d1) {
    var year = d1.getFullYear();
    
    var month = d1.getMonth();
    month++;
    if(month >= 1 && month <= 9) {
        month = '0' + month.toString();
    }
    else {
        month = month.toString();
    }
    var date = d1.getDate();
    if(date >= 1 && date <= 9) {
        date = '0' + date.toString();
    }
    
    return year + '-' + month + '-' + date;
}

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

sabrettx.filter('flightTime', function() {
    return function(date) {
        var jsDate = new Date(date);
        var resultString = jsDate.toLocaleTimeString() + ' (' + jsDate.toDateString() + ')';
        return resultString;
     };
});
