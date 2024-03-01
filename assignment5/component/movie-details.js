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
    vm.displayGenre = displayGenre;
    vm.genreSelected = genreService.getGenre();
    vm.displayMovie = [];
    vm.searchByMovieName = movieTitle.getMovieTitle();

    function getAllMovies() {
        var allMoviesArray = [];
        for(let i=0; i<localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = JSON.parse(localStorage.getItem(key));
            allMoviesArray.push(value);
        }
        return allMoviesArray;
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
            vm.displayMovie = getAllMovies();
        } else if (newGenre !== oldGenre) {
            vm.genreSelected = newGenre;
            vm.displayGenre();
        }
    })

    function displayGenre() {
        vm.allMovies = getAllMovies();
        vm.allMovies.forEach(function (movie) {
            var genreArray = movie.Genre.split(", ");
                if (genreArray.includes(vm.genreSelected)) {
                    vm.displayMovie.push(movie);
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
            $scope.displayMovieCard.Year = displayMovie.Year;
            $scope.displayMovieCard.Actors = displayMovie.Actors;
            $scope.displayMovieCard.Genre = displayMovie.Genre;
            $scope.displayMovieCard.Director = displayMovie.Director;
        };

        $scope.closeDialog = function () {
            $mdDialog.hide();
        };

        $scope.updateRating = function (index) {
            $scope.displayMovieCard.imdbRating = (index+1) * 2;
            console.log($scope.displayMovieCard.imdbRating)
        }

    }
}