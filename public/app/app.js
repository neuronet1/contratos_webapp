var contratosApp = angular.module('contratosApp',
            ['ui.router','contratos','common']);

contratosApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: '/app/contratos/partial/inicio.html'
        })
        .state('contratos', {
            url:'/contratos',
            templateUrl: '/app/contratos/partial/contratos.html',
            controller: 'contratos.list.controller'
        })
        .state('contratos.item', {
            url: '/item/:id',
            templateUrl: '/app/contratos/partial/contratos.item.html',
            controller: 'contratos.item.controller'
            /*
            controller: function($stateParams) {
               console.log('hola mundo 2');
                console.log($stateParams.id);
            }
            */
        });
});

