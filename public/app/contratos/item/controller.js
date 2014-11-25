contratosItem.controller('contratos.item.controller', function ($scope, $http, $stateParams) {
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
        if(!angular.isUndefined($stateParams.id)) {
            getContrato($stateParams.id, function (doc) {
                $scope.isEdited = false;
                $scope.current= doc;
                //clonamos los valores del trabajador
                $scope.original = jQuery.extend(true,{}, doc);
            });
        }

        $scope.onChange = function () {
            $scope.isEdited = true;
        };


        $scope.onUndo = function() {
            $scope.current = jQuery.extend(true,{}, $scope.original);
            $scope.isEdited = false;
        };

    });