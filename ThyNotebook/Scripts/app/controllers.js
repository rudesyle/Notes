; function ThyNotebookCtrl($scope, $http, $modal) {

    $scope.gridOptions = {
        data: 'selectedNotebook',
        jqueryUITheme: true,
        columnDefs: [{ field: 'Name', displayName: 'Name' }, { field: 'CreateDate', displayName: 'Created' }, { field: 'UpdateDate', displayName: 'Last Updated' }],
        enableRowSelection: true,
        selectedItems: $scope.selectedGridItem,
        multiSelect: false,
        afterSelectionChange: function (rowItem,event) {
            $scope.note = rowItem.entity;
            $scope.open();
        }
    };

    $scope.openAddNotebook = function() {
        alert("test");
    };

    $scope.note = null;

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
                }
            }
        });

        modalInstance.result.then(function (selectedNote) {
            $scope.note = selectedNote;
            $scope.save();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.save = function () {
        console.log($scope.note);
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

    $scope.GetNoteContent = function () {
        $("#contentEditor").html("I AM A BIG TERDBAG");
    };

    $scope.GetAllNotebooks = function () {
        $http({
            method: 'GET',
            url: 'breeze/notebook/GetAllNotebooks'
        }).
        success(function (data, status, headers, config) {
            $scope.notebooks = data.Notebooks;
            $scope.notes = data.Notes;
            $scope.selectedNotebook = data.Notes;
        }).
        error(function (data, status) {
            console.log("Request Failed");
        });
    };

    $scope.sendNotebook = function (notebook) {
        for(var i=0;i<=$scope.notes.length - 1;i++) {
            $scope.selectedNotebook = $scope.notes[0];
        }

    };

    $scope.GetAllNotebooks();
}

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance,$http, note) {

    $scope.editedNote = note;

    $scope.ok = function () {
        $modalInstance.close($scope.editedNote);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


var CreateNotebookCtrl = function ($scope, $modalInstance, $http, note) {

    $scope.editedNote = note;

    $scope.ok = function () {
        $modalInstance.close($scope.editedNote);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};