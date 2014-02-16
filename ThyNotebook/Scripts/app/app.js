; var notebookApp = angular.module('notebook', ['ngGrid', 'ui.bootstrap']);

notebookApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/notebook', {
        templateUrl: 'Index.html',
        controller: ThyNotebookCtrl
    });
    /*$routeProvider.when('/book-detail/:bookId', {
        templateUrl: 'book-detail.html',
        controller: BookCtrl
    });*/
    $routeProvider.otherwise({ redirectTo: 'Index.html' });
}]);