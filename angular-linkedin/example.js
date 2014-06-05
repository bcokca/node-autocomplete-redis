angular.module('plunker', ['ui.bootstrap']);
function TypeaheadCtrl($scope, $http, limitToFilter) {

    //http://www.geobytes.com/free-ajax-cities-jsonp-api.htm

    $scope.cities = function(cityName) {
        return $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter=US&q="+cityName).then(function(response){
            return limitToFilter(response.data, 15);
        });
    };

}