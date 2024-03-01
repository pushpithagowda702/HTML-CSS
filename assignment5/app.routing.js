'use strict'

var app = angular.module('movieDB');

app.config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.config(function ($stateProvider) {
    var loginSuccessful = {
        name: 'movieDb',
        url: '/home',
        templateUrl: 'movie-database.html' 
    }

    var signUp = {
        name: 'signup',
        url: '/sign-up',
        templateUrl: 'sign-up.html'
    }

    var signIn = {
        name: 'signin',
        url: '/',
        templateUrl: 'sign-in.html'
    }

    $stateProvider.state(loginSuccessful);
    $stateProvider.state(signUp);
    $stateProvider.state(signIn);
})