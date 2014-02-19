; var app = angular
    .module('notebook', ['ui.bootstrap','ngGrid' ]);

app.factory('notebookService', function () {
    this.createNote = function (note) {
        return $http({
            method: 'POST',
            url: '/breeze/notebook/SaveNote',
            data: note
        });
    };
});

/*app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/notebook', {
        templateUrl: 'Index.html',
        controller: ThyNotebookCtrl
    });

    $routeProvider.otherwise({ redirectTo: 'Index.html' });
    }]);
    */