; function ThyNotebookCtrl($scope, $http, $modal) {

    $scope.gridOptions = {
        data: 'selectedNotebook',
        jqueryUITheme: true,
        columnDefs: [{ field: 'Name', displayName: 'Name' }, { field: 'CreatedDate', displayName: 'Created' }],
        enableRowSelection: true,
        selectedItems: $scope.selectedGridItem,
        multiSelect: false,
        afterSelectionChange: function (rowItem,event) {
            //$scope.GetNoteContent();
            $scope.open();
        }
    };

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'contentEditor.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function () {
                    return $scope.notes;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.GetNoteContent = function() {
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
            alert($scope.notes[0].Name);
        }

    };

    $scope.GetAllNotebooks();
}

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};