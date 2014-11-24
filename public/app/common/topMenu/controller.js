topMenu.controller('common.topMenu.controller', function ($scope) {
    $scope.items = [
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
        return $scope.itemSelected == menu;
    }

});