;
var app = angular
    .module('notebook', ['ui.bootstrap', 'ui.tinymce']);

app.factory('notebookService', function() {
    this.createNote = function(note) {
        return $http({
            method: 'POST',
            url: '/breeze/notebook/SaveNote',
            data: note
        });
    };
});