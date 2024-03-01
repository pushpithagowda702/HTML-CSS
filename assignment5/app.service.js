'use strict'

var app = angular.module('movieDB');

app.service('authService', function ($http) {
        this.onLogin = function(email, password) {
            var credentials = {
                email: email,
                password: password
            }
            return $http.post("https://iot-data.mygreyter.com/greyter/api/v2/greyter-customer/auth/login", credentials)
        }

        this.onRegister = function(firstname, lastname, gender, phone, email, password) {
            var credentials = {
                first_name: firstname,
                last_name: lastname,
                gender: gender,
                phone: phone,
                email: email,
                password: password
            }
            console.log(email, password)
            return $http.post("https://iot-data.mygreyter.com/greyter/api/v2/greyter-customer/auth/register", credentials)
        }
})

app.service('genreService', function () {
        var genre = {};

        this.setGenre = function (genreSelected) {
            genre = genreSelected
        };

        this.getGenre = function () {
            return genre;
        }
    });

app.service('movieTitle', [function () {
        var movieTitle = "";

        this.setMovieTitle = function (movieName) {
            movieTitle = movieName;
        };

        this.getMovieTitle = function () {
            return movieTitle;
        }
    }]);
