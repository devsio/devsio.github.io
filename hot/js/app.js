/*
 * Elastica - Search UI for Elasticsearch
 */

/* Module */
window.Elastica = angular.module('elastica', ['elasticsearch', 'ngAnimate'],
    ['$locationProvider', function($locationProvider){
        $locationProvider.html5Mode(true);
    }]
);
