;

function ThyNotebookCtrl($scope, $http, $modal) {

    $scope.newNotebook = {
        Name: ''
    };

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.tinymceOptions = {
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        height: "400px",
        width: "650px"
    };

    $scope.notebookFilter = function() {
        var filterText = 'NotebookId:1';
        if ($scope.filterOptions.filterText === '') {
            $scope.filterOptions.filterText = filterText;
        } else if ($scope.filterOptions.filterText === filterText) {
            $scope.filterOptions.filterText = '';
        }
    };

    $scope.openEditNotebook = function(notebook) {
        $scope.newNotebook = notebook;
        var modalInstance = $modal.open({
            templateUrl: 'NoteBookEditor.html',
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

    $scope.note = null;

    $scope.editedNote = null;

    $scope.notebooks = [];

    $scope.open = function() {
        var modalInstance = $modal.open({
            templateUrl: 'NoteContentEditor.html',
            backdrop: 'static',
            controller: ModalInstanceCtrl,
            resolve: {
                $http: function() {
                    return $http;
                },
                note: function() {
                    return $scope.note;
                },
                availableNotebooks: function() {
                    return $scope.notebooks;
                }
            }
        });

        modalInstance.result.then(function(selectedNote) {
            $scope.note = selectedNote;
            $scope.saveNote();
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    //$scope.$watch($attrs.model, _.debounce(saveNote, 5000), true);

    $scope.saveNote = function() {
        $http({
                url: '/breeze/notebook/SaveNote',
                method: "POST",
                data: $scope.editedNote,
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function(data, status, headers, config) {
                toastr.success('Note saved');
            })
            .error(function(data, status, headers, config) {
                $scope.errorMessage = (data || { message: "Create operation failed." }).message + (' [HTTP-' + status + ']');
            });
    };

    $scope.deleteNote = function(note) {
        bootbox.confirm('Are you sure you want to delete this note?', function(result) {
            /*$http({
                url: '/breeze/notebook/DeleteNote',
                method: "POST",
                data: note,
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function (data, status, headers, config) {
                $scope.notes.splice(note);
                    toastr.success('Note deleted');
                })
            .error(function (data, status, headers, config) {
                $scope.errorMessage = (data || { message: "Delete Note failed." }).message + (' [HTTP-' + status + ']');
            });*/
        });
    };

    $scope.deleteNotebook = function(notebook) {
        $http({
                url: '/breeze/notebook/DeleteNotebook',
                method: "POST",
                data: notebook,
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function(data, status, headers, config) {
                $scope.notebooks.splice(notebook);
                toastr.success('Notebook deleted');
            })
            .error(function(data, status, headers, config) {
                $scope.errorMessage = (data || { message: "Delete Note failed." }).message + (' [HTTP-' + status + ']');
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
                $scope.notebooks.push(data);
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
                console.log("Request Failed");
            });
    };

    $scope.showNote = function(note) {
        $scope.editedNote = note;
        tinyMCE.activeEditor.setContent(note.Content);
    };

    $scope.filterNotebook = function(note) {
        $scope.selectedNotebookId = 0;
        $scope.selectedNotebookId = note.NotebookId;
        console.log($scope.selectedNotebookId);
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

    $scope.delete = function() {
        if (confirm("Are you sure?")) {
            $scope.newNotebook.IsDeleted = true;
            $modalInstance.close($scope.newNotebook);
        }
    };
};

var ModalInstanceCtrl = function($scope, $modalInstance, $http, note) {

    $scope.editedNote = note;

    $scope.ok = function() {
        $modalInstance.close($scope.editedNote);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};