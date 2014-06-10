var cache = require('./cache.js');


//the function for caching the datasource
module.exports.cacheData = function(key, datasource){

    //generate a unique id for that cache
    var generatedCacheKey = 'mahmut' + key;

    //put all field_values into the redis server
    cache.setHashMap(generatedCacheKey, datasource,
        function(error){
            if(error){
                console.log('Error occurred during caching data source', error);
                return error;
            }
        //generate all possible prefixes for all words
        cache.setSortedSet(generatedCacheKey, datasource,
            function(error){
                if(error){
                    console.log('Error occurred during caching data source', error);
                    return error;
                }
            });

    });

};


module.exports.generatePossibleKeys = function(){

};

//expire time -- should be optional
module.exports.setExpireTime = function(key, time){
    //time is not mandatory, default is 6 hours
    //it needs to be in miliseconds
    if(!time){
        time = 6*60*60*1000;
    }
    cache.extend(key,time);
};


module.exports.getTheValue = function(queryCacheKey, field_data_value, callback){
    //check if key is exist
    cache.getZrange(queryCacheKey, field_data_value,  function(err,isKeyExists){
        if(err){
            callback(err, null);
        }
        //if cache is not empty
        if(isKeyExists){
            //if key exist return the mapped values
            cache.hashMultipleGet(queryCacheKey, obj, function(error, result){
                if(error){
                    callback(error, null);
                }
                //instead of return we should callback to user
                callback(JSON.stringify(result));
            });
        }
    });
};





