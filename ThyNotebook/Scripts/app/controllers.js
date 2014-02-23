; function ThyNotebookCtrl($scope, $http, $modal) {

    $scope.newNotebook = {
        Name: ''
    };

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.notebookFilter = function () {
        var filterText = 'NotebookId:1';
        if ($scope.filterOptions.filterText === '') {
            $scope.filterOptions.filterText = filterText;
        }
        else if ($scope.filterOptions.filterText === filterText) {
            $scope.filterOptions.filterText = '';
        }
    };

    $scope.openAddNotebook = function () {
        
        var modalInstance = $modal.open({
            templateUrl: 'createNotebook.html',
            backdrop: 'static',
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
            console.log($scope.newNotebook);

            $scope.newNotebook = newNotebook;
            $scope.saveNotebook();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.note = null;

    $scope.editedNote = null;

    $scope.notebooks = [];

    $scope.selectedNotes = [];

    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'contentEditor.html',
            backdrop: 'static',
            controller: ModalInstanceCtrl,
            resolve: {
                $http: function () {
                    return $http;
                },
                note: function () {
                    return $scope.note;
                },
                availableNotebooks: function () {
                    return $scope.notebooks;
                }
            }
        });

        modalInstance.result.then(function (selectedNote) {
            $scope.note = selectedNote;
            $scope.saveNote();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.saveNote = function () {
        $http({
            url: '/breeze/notebook/SaveNote',
            method: "POST",
            data: $scope.note,
            headers: { 'Content-Type': 'application/json' }
        })
        .success(function (data, status, headers, config) {
            $scope.navigationManager.goToListPage();
        })
        .error(function (data, status, headers, config) {
            $scope.errorMessage = (data || { message: "Create operation failed." }).message + (' [HTTP-' + status + ']');
        });
    };

    $scope.saveNotebook = function () {
        $http({
            url: '/breeze/notebook/SaveNotebook',
            method: "POST",
            data: $scope.newNotebook,
            headers: { 'Content-Type': 'application/json' }
        })
        .success(function (data, status, headers, config) {
            $scope.notebooks.push(data);
            $scope.newNotebook = null;
            $scope.navigationManager.goToListPage();
        })
        .error(function (data, status, headers, config) {
            $scope.errorMessage = (data || { message: "Save notebook operation failed." }).message + (' [HTTP-' + status + ']');
        });
    };

    $scope.getNoteContent = function () {
        $("#contentEditor").html("I AM A BIG TERDBAG");
    };

    $scope.getAllNotebooks = function () {
        $http({
            method: 'GET',
            url: 'breeze/notebook/getAllNotebooks'
        }).
        success(function (data, status, headers, config) {
            console.log();
            $scope.notebooks = data.Notebooks;
            $scope.notes = data.Notes;
            $scope.selectedNotebook = data.Notes;
        }).
        error(function (data, status) {
            console.log("Request Failed");
        });
    };

    $scope.showNote = function (note) {
        $scope.editedNote = note;
    };

    $scope.filterNotebook = function (notebookId) {
        $scope.selectedNotes = [];
        for (var i = 0; i <= $scope.notes.length - 1; i++) {
            if ($scope.notes[i].NotebookId == notebookId) {
                $scope.selectedNotes.push($scope.notes[i]);
                
            }
            
        }
        console.log($scope.selectedNotes);
    };

    $scope.getAllNotebooks();
}

var CreateNotebookCtrl = function ($scope, $modalInstance, $http) {

    $scope.newNotebook = {
        Name: ''
    };

    $scope.ok = function () {
        $modalInstance.close($scope.newNotebook);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};