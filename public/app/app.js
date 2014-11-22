var contratosApp = angular.module('contratosApp',
            ['ngRoute','contratos']);

contratosApp.config(function ($routeProvider) {
    $routeProvider.
        when('/trabajador/:id',
        {
            templateUrl:'/app/contratos/contrato.tmpl.html',
            controller: 'contratosController'
        }).
        when('/',
            {
                templateUrl:'/app/contratos/init.tmpl.html',
                controller: 'contratosController'
            }
        ).
        otherwise({
            redirectTo: 'app/contratos/error.html'
        });
    });

contratosApp.controller('contratosController', function ($scope, $http, $routeParams) {
    $scope.trabajadores = {};
    $scope.isEdited = false;

    // Obtiene los datos de un contrato a partir del id
    var getContrato = function (id,cb) {
        $http.get('trabajadores/get/' + id, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(function (result) {
            cb(result.data);
        });
    };

    // si recibimos el id del trabajador obtenemos los datos de este
    if(!angular.isUndefined($routeParams.id)) {
        getContrato($routeParams.id, function (doc) {
            $scope.isEdited = false;
            $scope.current= doc;
            //clonamos los valores del trabajador
            $scope.original = jQuery.extend(true,{}, doc);
        });
    }

    $scope.onChange = function () {
        $scope.isEdited = true;
    };

    $scope.onImprimir = function (trabajador) {
        alert(trabajador._id);
    };

    $scope.onUndo = function() {
        $scope.current = jQuery.extend(true,{}, $scope.original);
        $scope.isEdited = false;
    };

    /*
    $scope.onClickTrabajador = function (trabajador) {
        $scope.isEdited = false;
        $scope.current= trabajador;
        //clonamos los valores del trabajador
        $scope.original = jQuery.extend(true,{}, trabajador);
    };
    */

    var onTrabajadoresComplete = function (response) {
        $scope.trabajadores = response.data;
    };

    var onError = function (err) {
        $scope.error = err;
    };

    $scope.init = function () {
        $http.get('/trabajadores/list', {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(onTrabajadoresComplete,onError);
    };



});
