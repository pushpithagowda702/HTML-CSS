'use strict'

var app = angular.module("movieDB");

app.controller("LoginController", function ($state, authService, $mdDialog) {
    var self = this;

    self.login = function (email, password) {
        authService.onLogin(email, password)
            .then(function (response) {
                console.log(response.data)
                if ('result' in response.data) {
                    console.log("Login Successfull", response.data);
                    $state.go("movieDb")
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Invalid Password')
                            .textContent('Invalid credentials')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Renter Password')
                    );
                }
            })
            .catch(function (error) {
                console.error("Login Failed", error);
            })
    }

    self.signUp = function (firstname, lastname, gender, phone, email, password, confirmpassword) {
        console.log(password, confirmpassword, password === confirmpassword)
        if (password === confirmpassword) {
            console.log(email)
            authService.onRegister(firstname, lastname, gender, phone, email, password)
                .then(function (response) {
                    console.log("Registered Successfully", response.data)
                    $state.go("signin")
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Invalid Password')
                    .textContent('Password and confirm password should be same')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
            );
        }
    }
});

app.controller("Controller", function ($mdSidenav, genreService, movieTitle, $rootScope) {
    const navItems = ["All", "Drama", "Horror", "Crime", "Action", "Adventure", "Comedy", "Romance", "Sci-Fi"];

    var self = this;
    self.navItems = navItems;
    self.toggleList = toggleList;
    self.selectedGenre = "None";
    self.genreClicked = genreClicked;
    self.searchByName = '';
    self.searchByMovieName = searchByMovieName;

    function searchByMovieName(movieName) {
        movieTitle.setMovieTitle(movieName)
        $rootScope.$broadcast('searchMovie')
    }

    function toggleList() {
        $mdSidenav('left').toggle();
    }

    function genreClicked(genre) {
        self.selectedGenre = genre;
        genreService.setGenre(genre);
        $rootScope.$broadcast('genreChanged');
    }
});