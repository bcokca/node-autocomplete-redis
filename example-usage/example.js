angular.module('plunker', ['ui.bootstrap']);
function TypeaheadCtrl($scope, $http, limitToFilter) {

    //http://www.geobytes.com/free-ajax-cities-jsonp-api.htm



    $scope.cities = function(cityName) {
        return $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter=US&q="+cityName).
            then(function(response){
            return limitToFilter(response.data, 15);
        });
    };

    $scope.getLookupData = function(cityName) {
        console.log('hello');

        return $http.get("http://localhost:8000/suggestion/key/myKey/value/"+ cityName).
            then(function(response){
                console.log(response.data);
                return limitToFilter(response.data, 15);
            });
    };


    /*
    $scope.getPreviousFieldData = function(val) {
        console.log('burhan ' + val);
        //we call our endpoint after the value's length bigger than 2
            return $http.get('localhost:8000/burhan' , {
            }).then(function(res){

                console.log(res);

                return res;
            });

    }; */
}