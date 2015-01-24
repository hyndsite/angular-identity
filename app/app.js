/**
 * Created by MaxR on 1/21/2015.
 */
(function(){
    'use strict';

    angular.module('naireApp', ['ngRoute'])

        .config([
            '$locationProvider',
            '$routeProvider',
            function($locationProvider, $routeProvider){
                //$locationProvider.hashPrefix('!');

                $routeProvider
                    .when("/",
                    {
                        templateUrl: "login.html",
                        controller: "login"
                    })
                    .otherwise({
                        redirectTo: "/"
                    });
            }
        ]);
}());