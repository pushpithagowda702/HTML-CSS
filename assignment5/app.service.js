angular.module('movieDB')
    .service('genreService', function () {
        var genre = {};

        this.setGenre = function (genreSelected) {
            genre = genreSelected
        };

        this.getGenre = function () {
            return genre;
        }
    });

angular.module('movieDB')
    .service('movieTitle', [function () {
        var movieTitle = "";

        this.setMovieTitle = function (movieName) {
            movieTitle = movieName;
        };

        this.getMovieTitle = function () {
            return movieTitle;
        }
    }]);
