/* Defines the "todo view" controller 
 * Constructor function relies on Ng injector to provide:
 *     $scope - context variable for the view to which the view binds
 *     $timeout - Angular equivalent of `setTimeout`
 */
app.notebook.controller('ThyNotebookCtrl', function ($scope, $timeout, $http) {

    var removeItem = breeze.core.arrayRemoveItem;
    // Use the Breeze angular ajax adapter;

    var instance = breeze.config.initializeAdapterInstance("ajax", "angular", true);
    // Optional if you want to share $http but not necessary.
    // instance.setHttp($http);

    var dataservice = window.app.dataservice;
    dataservice.$timeout = $timeout; // inject into dataservice
    var logger = window.app.logger;
    var suspendItemSave;

    $scope.searchText = "";

    // Beware: this is called a lot!
    $scope.itemFilter = function (notebookItem) {
        var searchText = $scope.searchText;
        return searchText ?
            // if there is search text, look for it in the description; else return true
            -1 != notebookItem.Name.toLowerCase().indexOf(searchText.toLowerCase()) :
            true;
    };

    $scope.changeNotebook = function () {
        alert("Hey");
    };

    $scope.newNotebook = "";
    $scope.items = [];
    $scope.includeArchived = false;

    $scope.getAllNotebooks = function() {
        dataservice.getAllNotebooks($scope.includeArchived)
            .then(querySucceeded)
            .fail(queryFailed);
    };

    $scope.getAllNotebooks();

    //#region private functions
    function querySucceeded(data) {
        $scope.items = [];

        data.results.forEach(function(item) {
            extendItem(item);
            $scope.items.push(item);
            console.log(item.Notes);
        });
        $scope.$apply();

        logger.info("Fetched notebooks " +
        ($scope.includeArchived ? "including archived" : "excluding archived"));
    }

    function queryFailed(error) {
        logger.error(error.message, "Query failed");
    }

    function extendItem(item) {
        if (item.isEditing !== undefined) return; // already extended

        item.isEditing = false;
        console.log(item);
        // listen for changes with Breeze PropertyChanged event
        item.entityAspect.propertyChanged.subscribe(function() {
            if (item.isEditing || suspendItemSave) {
                return;
            }
            // give EntityManager time to hear the change
            setTimeout(function() { saveIfModified(item); }, 0);
        });
    }

    function saveIfModified(item) {
        if (item.entityAspect.entityState.isModified()) {
            dataservice.saveChanges();
        }
    }

    function getStateOfItems() {
        var itemsDone = [], itemsLeft = [];

        $scope.items.forEach(function(item) {
            if (item.IsDone) {
                if (!item.IsArchived) {
                    itemsDone.push(item); // only unarchived items                
                }
            } else {
                itemsLeft.push(item);
            }
        });

        $scope.allCompleted = itemsLeft.length === 0 && $scope.items.length > 0;

        return {
            itemsDone: itemsDone,
            itemsDoneCount: itemsDone.length,
            itemsLeft: itemsLeft,
            itemsLeftCount: itemsLeft.length
        };
    }

//#endregion
});