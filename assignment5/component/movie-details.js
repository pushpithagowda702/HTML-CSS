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
    vm.genreSelected = genreService.getGenre();
    vm.displayMovie = [];
    vm.searchByMovieName = movieTitle.getMovieTitle();

    function getAllMovies() {
        var allMoviesArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = JSON.parse(localStorage.getItem(key));
            allMoviesArray.push(value);
        }
        return allMoviesArray;
    }

    $scope.$on("searchMovie", function () {
        vm.displayMovie = [];
        vm.searchByMovieName = movieTitle.getMovieTitle();;
        var movieList = localStorage.getItem(vm.searchByMovieName.toLowerCase());
        console.log(vm.searchByMovieName);
        if (movieList === null) {
            return $http.get("http://www.omdbapi.com/?t=" + vm.searchByMovieName + "&apikey=ee1c62d1")
                .then(function (response) {
                    if (response.data.Response === 'False') {
                        return;
                    }
                    localStorage.setItem(vm.searchByMovieName.toLowerCase(), JSON.stringify(response.data));
                    vm.displayMovie.push(response.data);
                });
        } else {
            vm.displayMovie.push(JSON.parse(movieList));
            console.log(vm.displayMovie);
        }
    });

    $scope.$on("genreChanged", function () {
        vm.displayMovie = [];
        vm.allMovies = getAllMovies();
        vm.genreSelected = genreService.getGenre();
        if (vm.genreSelected === "All") {
            vm.displayMovie = getAllMovies();
        } else {
            vm.allMovies.forEach(function (movie) {
                var genreArray = movie.Genre.split(", ");
                if (genreArray.includes(vm.genreSelected)) {
                    vm.displayMovie.push(movie);
                }
            });
        }
    });

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
        $scope.displayMovieCard = angular.copy(displayMovie);

        $scope.updateMovie = function (answer) {
            localStorage.setItem(displayMovie.Title.toLowerCase(), JSON.stringify(answer));
            $mdDialog.hide(answer);
        };

        $scope.reset = function () {
            $scope.displayMovieCard = displayMovie;
            $scope.movieCard.$setPristine();
        };

        $scope.closeDialog = function () {
            $mdDialog.hide();
        };

        $scope.updateRating = function (index) {
            $scope.displayMovieCard.imdbRating = (index + 1) * 2;
            console.log($scope.displayMovieCard.imdbRating)
        }

    }
}