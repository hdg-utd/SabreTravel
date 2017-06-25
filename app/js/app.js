'use strict';

var sabrettx = angular.module('sabrettx', ['ngMaterial', 'ui.router']);

sabrettx.config(function($stateProvider) {
    var flightChooseState = {
        name: 'Choose your flight',
        url: '/',
        template: '<h3>hello world!</h3>'
    }

    var addExtraDestinationState = {
        name: 'Add an extra destion to your flight',
        url: '/extra_destinations',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    }

    var addExtraEventState = {
        name: 'Add events to go to ',
        url: '/extra_event',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    }

    $stateProvider.state(flightChooseState);
    $stateProvider.state(addExtraDestinationState);
    $stateProvider.state(addExtraEventState);
});