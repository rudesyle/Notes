;

function ThyNotebookCtrl($scope, $http, $modal) {

    $scope.newNotebook = {
        Name: ''
    };

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.notebookFilter = function() {
        var filterText = 'NotebookId:1';
        if ($scope.filterOptions.filterText === '') {
            $scope.filterOptions.filterText = filterText;
        } else if ($scope.filterOptions.filterText === filterText) {
            $scope.filterOptions.filterText = '';
        }
    };

    $scope.openEditNotebook = function (notebook) {
        if (notebook == null) {
            notebook = {
                Name: '',NotebookId:0
            };
        }

        $scope.newNotebook = notebook;
        var modalInstance = $modal.open({
            templateUrl: 'NoteBookEdit.html',
            backdrop: 'modal',
            controller: CreateNotebookCtrl,
            resolve: {
                $http: function() {
                    return $http;
                },
                notebook: function() {
                    return $scope.newNotebook;
                }
            }
        });

        modalInstance.result.then(function(newNotebook) {
            console.log(newNotebook.IsDeleted);
            if (newNotebook.IsDeleted) {
                $scope.deleteNotebook(newNotebook);
            } else {
                $scope.newNotebook = newNotebook;
                $scope.saveNotebook();
            }

        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openAddNotebook = function () {
        $scope.newNotebook = {
            Name: '', NotebookId: 0
        };

        var modalInstance = $modal.open({
            templateUrl: 'NoteBookNew.html',
            backdrop: 'modal',
            controller: CreateNotebookCtrl,
            resolve: {
                $http: function () {
                    return $http;
                },
                notebook: function () {
                    return $scope.newNotebook;
                }
            }
        });

        modalInstance.result.then(function (newNotebook) {
            $scope.newNotebook = newNotebook;
            $scope.saveNotebook();
            $scope.push(newNotebook);

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.note = null;

    $scope.editedNote = null;

    $scope.notebooks = [];

    $scope.saveNote = function () {
        $scope.editedNote.Content = tinyMCE.activeEditor.getContent();
        $http({
                url: '/breeze/notebook/SaveNote',
                method: "POST",
                data: $scope.editedNote,
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function(data, status, headers, config) {
                toastr.success('Note saved');
                $scope.push($scope.editedNote);
            })
            .error(function(data, status, headers, config) {
                $scope.errorMessage = (data || { message: "Create operation failed." }).message + (' [HTTP-' + status + ']');
            });
    };

    $scope.deleteNote = function(note) {
        bootbox.confirm('Are you sure you want to delete this note?', function(result) {
            $http({
                url: '/breeze/notebook/DeleteNote',
                method: "POST",
                data: note,
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function (data, status, headers, config) {
                var index = $scope.notes.indexOf(note);
                $scope.notes.splice(index, 1);
                toastr.success('Note deleted');
            })
            .error(function (data, status, headers, config) {
                $scope.errorMessage = (data || { message: "Delete Note failed." }).message + (' [HTTP-' + status + ']');
            });
        });
    };

    $scope.deleteNotebook = function (notebook) {
        bootbox.confirm('Are you sure you want to delete this notebook?', function(result) {
            $http({
                    url: '/breeze/notebook/DeleteNotebook',
                    method: "POST",
                    data: notebook,
                    headers: { 'Content-Type': 'application/json' }
                })
                .success(function(data, status, headers, config) {
                    var index = $scope.notebooks.indexOf(notebook);
                    $scope.notebooks.splice(index, 1);
                    toastr.success('Notebook deleted');
                })
                .error(function(data, status, headers, config) {
                    $scope.errorMessage = (data || { message: "Delete Note failed." }).message + (' [HTTP-' + status + ']');
               });
        });
    };

    $scope.saveNotebook = function() {
        $http({
                url: '/breeze/notebook/SaveNotebook',
                method: "POST",
                data: $scope.newNotebook,
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function(data, status, headers, config) {
                $scope.newNotebook = null;
                toastr.success('Notebook saved');
            })
            .error(function(data, status, headers, config) {
                $scope.errorMessage = (data || { message: "Save notebook operation failed." }).message + (' [HTTP-' + status + ']');
            });
    };

    $scope.getAllNotebooks = function() {
        $http({
                method: 'GET',
                url: 'breeze/notebook/getAllNotebooks'
            }).
            success(function(data, status, headers, config) {
                console.log();
                $scope.notebooks = data.Notebooks;
                $scope.notes = data.Notes;
                $scope.selectedNotebook = data.Notes;
            }).
            error(function(data, status) {
                toastr.fail("Request Failed");
            });
    };

    $scope.createNote = function () {
        $scope.editedNote = note;
        tinyMCE.activeEditor.setContent(note.Content);
        $('.mce-toolbar-grp').hide();
        $('.mce-toolbar').hide();
        $('.mce-statusbar').hide();
    };

    $scope.showNote = function (note) {
        if (note == null) {
            note = {
                Name: '', NotebookId: 0, NoteId: 0
            };
        }

        $scope.editedNote = note;
        tinyMCE.activeEditor.setContent(note.Content);
        /*$('.mce-toolbar-grp').hide();
        $('.mce-toolbar').hide();
        $('.mce-statusbar').hide();*/
    };

    $scope.filterNotebook = function(note) {
        $scope.selectedNotebookId = 0;
        $scope.selectedNotebookId = note.NotebookId;
    };

    $scope.noteFilter = function (note) {
        return note.NotebookId == $scope.selectedNotebookId;
    };

    $scope.getAllNotebooks();
}

var CreateNotebookCtrl = function($scope, $modalInstance, $http, notebook) {

    $scope.newNotebook = notebook;

    $scope.ok = function() {
        $modalInstance.close($scope.newNotebook);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};

var ModalInstanceCtrl = function($scope, $modalInstance, $http, note) {

    $scope.editedNote = note;

    $scope.ok = function () {
        $modalInstance.close($scope.editedNote);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};


