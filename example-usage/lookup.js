var search = require('../lib/search');

//***************************************************************************************************************************
// allUsersInformation
exports.getSuggestions = function (request) {

    var value = request.params.value;
    var key = request.params.key;
      var arr = ['dwa', 'dwad'];
   // search.cacheData('myKey', ['mahmut', 'sevki']);

    //search.getTheValue(key, value, function(err, arr){

        request.reply (JSON.stringify(arr));

    //});





};





