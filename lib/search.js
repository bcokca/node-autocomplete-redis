var cache = require('./cache.js');


//the function for caching the datasource
module.exports.cacheData = function(key, datasource, callback){

    cache.getZrange(key, datasource,  function(err,obj){

        if(err){request.reply(err);return false;}

        //if cache is not empty
        if(obj){
            //todo -- utilities error obj create
            console.log('The key is already exist');
            callback('Cache is not empty');
            return;

        }else{
            //put all field_values into the redis server
            //todo -- use async library
            cache.setHashMap(key, datasource,function(error){
                if(error){console.log('Error occurred during caching data source', error);callback(error, null);return;}
                //generate all possible prefixes for all words
                cache.setSortedSet(key, datasource, function(error){
                    if(error){console.log('Error occurred during caching data source', error);callback(error, null);return;}

                    setExpireTime(key);

                    callback(null);
                });
            });
        }

    });

};


module.exports.generatePossibleKeys = function(){
    //in case if need to generate keys
};

//expire time -- should be optional
function setExpireTime(key, time){
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
            cache.hashMultipleGet(queryCacheKey, isKeyExists, function(error, result){
                if(error){
                    callback(error, null);
                }
                callback(null, JSON.stringify(result));
            });
        }
    });
};





