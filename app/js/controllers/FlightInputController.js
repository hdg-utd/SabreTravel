'use strict';

var FlightInputController = sabrettx.controller('FlightInputController', function($scope, $http) {
    $scope.saveFlightData = function(flight) {
        $scope.origin = flight.origin.toUpperCase();
        $scope.destination = flight.destination.toUpperCase();
        $scope.departing = flight.departing;
        $scope.return = flight.return;
        
        $scope.flight_check = true;
        
        if(countWeekendDays($scope.departing, $scope.return) / 2 >= 1) {
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
    
    $scope.flights = [
        {
            origin: "BOM",
            destination: "ATL",
            departing: "2017-06-23",
            return: "2017-07-23",
            price: "345"
        },
        {
            origin: "DFW",
            destination: "LON",
            departing: "2017-03-22",
            return: "2017-05-13",
            price: "234"
        }
    ];
    
//    $http({
//        method: 'GET';,
//        url: '/instaFlights'
//    }).then(function successCallback(response) {
//        $scope.flights = response.PricedItineraries;
//    }, function errorCallback(response) {
//        console.log('HTTP Error');
//    });
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