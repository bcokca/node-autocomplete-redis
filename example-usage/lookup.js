var search = require('../lib/search');

//var cache = require('../lib/cache');

//***************************************************************************************************************************
// allUsersInformation
exports.getSuggestions = function (request) {

    var value = request.params.value;
    var key = request.params.key;
    //var arr = ['dwa', 'dwad'];

    var myArray = ['burhan', 'mahmut'];

    search.cacheData(key, myArray,function(error){
        if(error){
            console.log('error occured');

            search.getTheValue(key, value,function(err, result){

                if(err){
                    console.log(err);
                    request.reply(err);

                }else{
                    console.log(result);
                    request.reply(result);
                }

            });


        };


    });

              /*
    //check if key is exist
    cache.getZrange(key, value,  function(err,obj){

        if(err){request.reply(err);return false;}

        //if cache is not empty
        if(obj){
            //if key exist return the mapped values
            cache.hashMultipleGet(key, obj, function(err2, obj2){
                if(err2){request.reply(err2); return false;}
                console.log(obj2);
                request.reply(JSON.stringify(obj2));
                return true;
            });
        }else{


               //else we need to cache it
              search.cacheData(key, myArray);
            request.reply(JSON.stringify(myArray));

        }
    });

            */


};





