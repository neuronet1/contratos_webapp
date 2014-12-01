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

        // xarreglar la generacion de la variable data la puedes extraer pues
        // también la vas a ocupar cuando creas un nuevo contrato
        var postContrato = function (contrato) {
            $http({
                method:'POST',
                url: 'trabajadores/save',
                data: {
                    _id: contrato._id,
                    contrato: {
                        trabajador: {
                            nombre: contrato.trabajador.nombre,
                            ficha: contrato.trabajador.ficha,
                            nivel: contrato.trabajador.nivel,
                            profesion: contrato.trabajador.profesion,
                            categoria: contrato.trabajador.categoria,
                            puesto: contrato.trabajador.puesto
                        },
                        casa: {
                            status: contrato.casa.status,
                            colonia: contrato.casa.colonia,
                            cp: contrato.casa.cp,
                            parcela:contrato.casa.parcela,
                            escritura:contrato.casa.escritura,
                            estado: contrato.casa.estado,
                            casa:contrato.casa.casa
                        },
                        empresa: {
                            centro: contrato.empresa.centro,
                            area: contrato.empresa.area
                        },
                        fechas: {
                            solicitud: contrato.fechas.solicitud,
                            autorizacion: contrato.fechas.autorizacion,
                            inicioVigencia: contrato.fechas.inicioVigencia,
                            finVigencia: contrato.fechas.finVigencia,
                            firmaContrato: contrato.fechas.firmaContrato
                        },
                        actas: {
                            numero: contrato.actas.numero
                        },
                        firmas: {
                            sancion: contrato.firmas.sancion,
                            recursosHumanos: contrato.firmas.recursosHumanos,
                            admonPatri: contrato.firmas.admonPatri
                        }
                    }
                }
            })
                .success(function (data, status) {
                    toastr.success('El cambio ha sido guardado');
                    $scope.isEdited = false;
                })
                .error(function (data, status) {
                    alert('Ocurrio un error en el cambio' + data);
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
            console.log('onchange');
        };

        $scope.onUndo = function() {
            $scope.current = jQuery.extend(true,{}, $scope.original);
            $scope.isEdited = false;
        };

        $scope.onPostContrato = function() {
            postContrato($scope.current);
        };

        $scope.interacted = function(field) {
            console.log('interacted');
            return field.$dirty;
        };

    });