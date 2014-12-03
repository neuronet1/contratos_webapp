topMenu.controller('common.topMenu.controller', function ($scope) {
    $scope.items = [
        {
            "menu": "Inicio",
            "ref": 'inicio',
            "icon": 'glyphicon glyphicon-home'
        },
        {
            "menu": "Contratos de arrendamiento",
            "ref": 'contratos',
            "icon": 'glyphicon glyphicon-book'
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