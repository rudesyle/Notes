; function ThyNotebookCtrl($scope, $http, $templateCache) {

    $scope.gridOptions = {
        data: 'selectedNotebook',
        jqueryUITheme: true,
        columnDefs: [{ field: 'Name', displayName: 'Name' }, { field: 'CreatedDate', displayName: 'Created' }]
    };

    $scope.GetAllNotebooks = function () {
        $http({
            method: 'GET',
            url: 'breeze/notebook/GetAllNotebooks',
            cache: $templateCache
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


    //Get our helper methods
    $scope.GetRatingImage = GetRatingImage;
    $scope.GetActualPrice = GetActualPrice;
    $scope.HasDiscount = HasDiscount;

    $scope.sendNotebook = function (notebook) {
        for(var i=0;i<=$scope.notes.length - 1;i++) {
            $scope.selectedNotebook = $scope.notes[0];
            alert($scope.notes[0].Name);
        }

    };

    $scope.GetAllNotebooks();
}

function BookCtrl($scope, $http, $templateCache, $routeParams) {
    $scope.bookId = $routeParams.bookId;
    $scope.book = {};

    $http({
        method: 'GET',
        url: 'api/book/' + $scope.bookId,
        cache: $templateCache
    }).
    success(function (data, status, headers, config) {
        $scope.book = data[0];
    }).
    error(function (data, status) {
        console.log("Request Failed");
    });

    //Get our helper methods
    $scope.GetRatingImage = GetRatingImage;
    $scope.GetActualPrice = GetActualPrice;
    $scope.HasDiscount = HasDiscount;
}

//Gets rating image based on the rating value passed
function GetRatingImage(rating) {
    switch (rating) {
        case 0:
            return "0star.png";
            break;
        case 1:
            return "1star.png";
            break;
        case 2:
            return "2star.png";
            break;
        case 3:
            return "3star.png";
            break;
        case 4:
            return "4star.png";
            break;
        case 5:
            return "5star.png";
            break;
    }
}

//Gets the actual price after deducting the discount
function GetActualPrice(price, discount) {
    var discountString = Math.round(discount * 100) + "%";
    var finalPrice = price - (price * discount)
    if (discount > 0) {
        return "Rs. " + Math.round(finalPrice) + "(" + discountString + ")";
    }
    else {
        return "";
    }
};

//Determines if there is any discount for the book or not
function HasDiscount(discount) {
    return (discount > 0);
};