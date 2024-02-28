'use strict'

var app = angular.module('movieDB');

app.component('movieDetails', {
    templateUrl: "template/movie-details.html",
    controller: displayMovieDetails
})

function displayMovieDetails($mdDialog, genreService, $scope, movieTitle, $http) {
    var vm = this;

    vm.allMovies = getAllMovies();
    vm.selectedMovie = null;
    vm.hasMovies = hasMovies;
    vm.displayGenre = displayGenre;
    vm.genreSelected = genreService.getGenre();
    vm.displayMovie = [];
    vm.searchByMovieName = movieTitle.getMovieTitle();
    var productRatings = [];

    $scope.$watch(function() {
        return localStorage.length
    }, function(newLength, oldLength) {
        if(newLength !== oldLength) {
            vm.allMovies = getAllMovies();
        }
    })

    function getAllMovies() {
        var allMoviesArray = [];
        for(let i=0; i<localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = JSON.parse(localStorage.getItem(key));
            allMoviesArray.push(value);
        }
        return allMoviesArray;
    }

    function hasMovies() {
        return (vm.displayMovie.length === 0)
    }

    $scope.$watch(function () {
        return movieTitle.getMovieTitle();
    }, function (newMovie, oldMovie) {
        if (newMovie !== oldMovie) {
            vm.displayMovie = [];
            vm.searchByMovieName = newMovie;
            var movieList = localStorage.getItem(vm.searchByMovieName.toLowerCase());
            console.log(vm.searchByMovieName);
            if (movieList === null) {
                return $http.get("http://www.omdbapi.com/?t=" + vm.searchByMovieName + "&apikey=ee1c62d1")
                    .then(function (response) {
                        if(response.data.Response === 'False') {
                            return;
                        }
                        localStorage.setItem(vm.searchByMovieName.toLowerCase(), JSON.stringify(response.data));
                        vm.displayMovie.push(response.data);
                    });
            } else {
                vm.displayMovie.push(JSON.parse(movieList));
                console.log(vm.displayMovie);
            }
        }
    });

    $scope.$watch(function () {
        return genreService.getGenre();
    }, function (newGenre, oldGenre) {
        vm.displayMovie = [];
        if (newGenre === "All") {
            vm.displayMovie = vm.allMovies;
        } else if (newGenre !== oldGenre) {
            vm.genreSelected = newGenre;
            vm.displayGenre();
        }
    })

    function displayGenre() {
        vm.allMovies.forEach(function (movie) {
            var genreArray = movie.Genre.split(",");
            for (let i = 0; i < genreArray.length; i++) {
                if (genreArray[i].trim() === vm.genreSelected) {
                    vm.displayMovie.push(movie);
                    break;
                }
            }
        });
    }

    vm.updateInfo = function (ev, movie) {
        vm.selectedMovie = movie;
        $mdDialog.show({
            templateUrl: "template/update-movie-details.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            locals: {
                displayMovie: vm.selectedMovie
            },
            controller: DialogController
        });

    }

    function DialogController($scope, $mdDialog, displayMovie) {
        $scope.displayMovieCard = displayMovie;

        $scope.updateMovie = function (answer) {
            localStorage.setItem(displayMovie.Title.toLowerCase(), JSON.stringify(answer));
            $mdDialog.hide(answer);
        };

        $scope.clearDialog = function () {
            $scope.displayMovieCard.Year = null;
            $scope.displayMovieCard.Actors = null;
            $scope.displayMovieCard.Genre = null;
            $scope.displayMovieCard.Director = null;
        };

        $scope.closeDialog = function () {
            $mdDialog.hide();
        };

    }
}