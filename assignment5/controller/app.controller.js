'use strict'

var app = angular.module("movieDB");


app.controller("Controller", function ($mdSidenav, genreService, movieTitle, $scope) {
    var self = this;

    self.toggleList = toggleList;
    self.navItems = ["All", "Drama", "Horror", "Crime", "Action", "Adventure", "Comedy", "Romance", "Sci-Fi"];
    self.selectedGenre = "None";
    self.genreClicked = genreClicked;
    self.searchByName = '';
    self.searchByMovieName = searchByMovieName;
    // genreService.setGenre("All");

   // Search a movie by name
   function searchByMovieName(movieName) {
        movieTitle.setMovieTitle(movieName)
   }

    // Toggle menu
    function toggleList() {
        $mdSidenav('left').toggle();
    }

    // Display the selected genre name
    function genreClicked(genre) {
        self.selectedGenre = genre;
        genreService.setGenre(genre);
    }

});