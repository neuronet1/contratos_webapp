var contratosApp = angular.module('contratosApp', []);

contratosApp.controller('contratosController', function ($scope, $http) {
    $scope.trabajadores = {};
    $scope.isEdited = false;


    $scope.onChange = function () {
        $scope.isEdited = true;
    };

    $scope.onUndo = function() {
        $scope.current = jQuery.extend(true,{}, $scope.original);
        $scope.isEdited = false;
    };

    $scope.onClickTrabajador = function (trabajador) {
        $scope.isEdited = false;
        $scope.current= trabajador;
        //clonamos los valores del trabajador
        $scope.original = jQuery.extend(true,{}, trabajador);
    };

    var onTrabajadoresComplete = function (response) {
        $scope.trabajadores = response.data;
    };

    var onError = function (err) {
        $scope.error = err;
    }

    $scope.init = function () {
        $http.get('/trabajadores/list', {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(onTrabajadoresComplete,onError);
    };

});
