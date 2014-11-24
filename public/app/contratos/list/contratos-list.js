angular.module('contratos.list', []).
    controller('contratos.list.controller', function ($scope,$http/*,$routeParams*/) {

        $scope.trabajadores = null;
        $scope.itemSelected = null;

        $scope.changeItemSelected = function (item) {
            $scope.itemSelected = item;
        };

        $scope.isItemSelected = function (item) {
            return $scope.itemSelected == item;
        };

        var onTrabajadoresComplete = function (response) {
            $scope.trabajadores = response.data;
        };

        var onError = function (err) {
            $scope.error = err;
        };

        $scope.getContratosList = function () {
            $http.get('/trabajadores/list', {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(onTrabajadoresComplete,onError);
        };

        if($scope.trabajadores == null) {
            $scope.getContratosList();
        }

    });