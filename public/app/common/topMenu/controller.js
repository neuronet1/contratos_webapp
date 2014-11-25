topMenu.controller('common.topMenu.controller', function ($scope) {
    $scope.items = [
        {
            "menu": "Subgerencia deAdministración Patrimonial y de Servicios",
            "ref": 'inicio',
            "icon": 'glyphicon glyphicon-home'
        },
        {
            "menu": "Contratos de arrendamiento",
            "ref": 'contratos',
            "icon": 'glyphicon glyphicon-book'
        },
        {
            "menu": 'Configuración',
            "ref": 'configuracion',
            "icon": 'glyphicon glyphicon-cog'
        }
    ];

    $scope.itemSelected = null;

    $scope.changeMenuSelected = function (menu) {
        $scope.itemSelected = menu;
    };

    $scope.isSelected = function(menu) {
        // Si no hay un elemento seleccionado apuntamos al primero
        if($scope.itemSelected === null) {
            $scope.itemSelected = $scope.items[0];
        }

        return $scope.itemSelected === menu;
    };

});