var contratosApp = angular.module('contratosApp',
            ['ui.bootstrap','ui.router','ngAnimate','ngMessages','contratos','common']);

contratosApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    toastr.options = {
        showMethod : 'slideDown',
        hideMethod : 'slideUp',
        timeOut : 3000,
        progressBar: true
    };


    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: '/app/contratos/home/partial/inicio.html'
        })
        .state('contratos', {
            url:'/contratos',
            templateUrl: '/app/contratos/home/partial/contratos.html',
            controller: 'contratos.list.controller'
        })
        .state('contratos.item', {
            url: '/item/:id',
            templateUrl: '/app/contratos/item/partial/item.html',
            controller: 'contratos.item.controller'
        });
});

