;
var app = angular
    .module('notebook', ['ui.bootstrap', 'ui.tinymce']);

app.factory('notebookService', function () {
    this.createNote = function (note) {
        return $http({
            method: 'POST',
            url: '/breeze/notebook/SaveNote',
            data: note
        });
    };
});

app.directive('hello', function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div>Hello readers, thank you for coming</div>"
    }
});
