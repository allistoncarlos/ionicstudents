var app = angular.module('students');

app.controller("StudentsController", function ($scope, $stateParams, $http, $ionicLoading, $ionicHistory) {
    var baseUrl = "http://aspnetcoreapi.azurewebsites.net/api/";

    $scope.loadStudents = function() {
        var req = {
            method: 'GET',
            url: baseUrl + "student/"
        };

        $ionicLoading.show();

        $http(req).then($scope.successLoading, $scope.error);
    };

    $scope.saveStudent = function() {
        var req;
        
        if ($scope.student.id == null)
            req = {
                method: 'POST',
                url: baseUrl + "student/",
                data: {
                    name: $scope.student.name,
                    email: $scope.student.email
                }
            };
        else
            req = {
                method: 'PUT',
                url: baseUrl + "student/" + $scope.student.id,
                data: {
                    id: $scope.student.id,
                    name: $scope.student.name,
                    email: $scope.student.email
                }
            }

        $ionicLoading.show();

        $http(req).then($scope.successSaving, $scope.error);
    };

    $scope.loadStudent = function(id) {
        var req = {
            method: 'GET',
            url: baseUrl + "student/" + id
        };

        $ionicLoading.show();

        $http(req).then($scope.successLoadingSingle, $scope.error);
    }

    $scope.successLoading = function (resp) {
        $ionicLoading.hide();

        if (resp.data.ok) {
            $scope.students = resp.data.data;
        }
    };

    $scope.successSaving = function (resp) {
        $ionicLoading.hide();

        if (resp.data.ok) {
            $ionicHistory.goBack();
        }
    };

    $scope.successLoadingSingle = function (resp) {
        $ionicLoading.hide();

        if (resp.data.ok) {
            $scope.student = resp.data.data;
        }
    };

    $scope.successDeleting = function (resp) {
        $scope.loadStudents();
    };

    $scope.error = function (error) {
        $ionicLoading.hide();

        console.log(error);
    };

    $scope.remove = function(student) {
        var req = {
            method: 'DELETE',
            url: baseUrl + "student/" + student.id
        }

        $ionicLoading.show();

        $http(req).then($scope.successDeleting, $scope.error);
    };

    $scope.$on('$ionicView.enter', function (e) {
        $scope.student = {};

        if ($stateParams.studentId == null)
            $scope.loadStudents();
        else {
            $scope.loadStudent($stateParams.studentId);
        }
    });
});