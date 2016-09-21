var app = angular.module('students');

app.controller("AccountController", function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});