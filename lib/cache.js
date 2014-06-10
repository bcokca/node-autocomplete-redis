var utilities = require('./utilities');
var async = require('async');
var redis = require("redis");


//var redisClient = redis.createClient(utilities.redisConfiguration.host, utilities.redisConfiguration.port);


// get object field value by key
module.exports.get = function(key, callback) {

    if(key && redisClient){

        redisClient.exists(key, function (err, result) {

            if (err) {

                callback (utilities.ErrorHandler('internal', 'Cache connection error',err));

            } else if (result == 0) {

                callback(err, null);

            } else if (result == 1) {

                redisClient.get(key, function (err, obj) {

                    if (err) {

                        callback (utilities.ErrorHandler('internal', 'Cache connection error',err));

                    } else {
                        callback(null, obj);

                    }
                });
            }
        });
    } else {
        callback (utilities.ErrorHandler('unauthorized', 'missing cache parameters',err));
    }
};


// get object field value by key
module.exports.set = function(key, value, callback) {
    if(key && redisClient){
        redisClient.exists(key, function (err, result) {
            if (err) {
                callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
            } else {

                redisClient.set(key, value, function (err) {

                    if (err) {

                        callback (utilities.ErrorHandler('internal', 'Cache connection error',err));

                    }
                });

            }
        });
    } else {
        callback (utilities.ErrorHandler('unauthorized', 'missing cache parameters'));
    }
};


// get object field value by key
module.exports.del = function(key, callback) {
    if(key && redisClient){
        redisClient.exists(key, function (err, result) {
            if (err) {

                callback (utilities.ErrorHandler('internal', 'Cache connection error',err));

            } else {

                redisClient.del(key, function (err) {

                    if (err) {

                        callback (utilities.ErrorHandler('internal', 'Cache connection error',err));

                    }
                });

            }
        });
    } else {

        callback (utilities.ErrorHandler('unauthorized', 'missing cache parameters'));
    }
};



// expires related keys
module.exports.expire = function(key, callback, client) {

    //use the passed client else use global one
    var myClient = redisClient;
    if(client){
        myClient = client;
    }
    async.waterfall([
        function(callback){

            // we will search for any key that contains the key parameters
            findPattern='*' + key + '*' ;

            //find matching keys
            myClient.keys(findPattern, function (err, obj) {
                if (err) {

                    callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
                } else {
                    callback(null, obj);
                }
            });

        },

        //arg1 is previous functions return
        function(arg1, callback){
            if (arg1!='') {

                myClient.del(arg1, function (err, obj) {
                    if (err) {

                        callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
                    } else {
                        callback(null, 'key deleted:'+arg1);
                    }
                });

            } else {

                callback(null, 'key not found');

            }
        }


    ], function (err, result) {
        // result now equals 'done'
        // console.log (result);
    });
};

// extend key expiration
module.exports.extend = function(key, time) {
    redisClient.expire(key, time);
};


module.exports.expirefromSQL = function(sql, callback) {

       // find inset, update, del
     // find tables - > find related api routes
      // find related routes and objects
    // expire them

};


module.exports.createCacheKey = function(key, parameters) {

    var paramsString = JSON.stringify(parameters).replace('"','');

    return key + 'object:' + paramsString;

};


//Create a Redis Hash object and save all of the data-field-value phrases by repeatedly calling the HSET command
module.exports.setHashMap = function(key, arr, callback) {
    if(key && redisClient){
        redisClient.exists(key, function (err, result) {
            if (err) {
                console.log (utilities.ErrorHandler('internal', 'Cache connection error', err));
                //utilities.log ('error','Cache connection error:',err);
                callback (utilities.ErrorHandler('internal', 'Cache connection error'));
            } else {
                for(var i=0; i<arr.length;i++){
                    redisClient.hset(key, i, arr[i], function (err) {
                        if (err) {

                            callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
                        }
                    });
                }
            }
        });
    } else {

        callback (utilities.ErrorHandler('error', 'missing cache parameters'));
    }
};


/*Once all of the phrases are saved into the Redis hash
then generate all the possible prefixes for all of the words appearing in the phrases
*/
module.exports.setSortedSet = function(key, arr, callback) {
    if(key && redisClient){
        for(var i=0; i<arr.length;i++){
            //split string into an array
            var res = arr[i].split(" ");

            for(var j=0; j<res.length; j++){
                //our first word
                var wordOfRes = res[j];
                var syllable = '';
                for(var k =0; k<wordOfRes.length; k++){
                    syllable += wordOfRes[k];
                    //new key
                    var newKey =  key + ':' + syllable;
                    //zadd
                    redisClient.zadd(newKey, 0, i , function (err) {
                        if (err) {
                            callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
                        }
                    });
                }
            }
        }
    } else {

        callback (utilities.ErrorHandler('error', 'missing cache parameters'));
    }
};


/*
* by calling the ZRANGE command to get all of the set’s elements
* (0 means start from the first element, and -1 means continue until the end)
* */
module.exports.getZrange = function(key, value, callback) {
    if(key && redisClient){
        redisClient.exists(key, function (err, result) {
            if (err) {
                console.log (utilities.ErrorHandler('internal', 'Cache connection error', err));
                //utilities.log ('error','Cache connection error:',err);
                callback (utilities.ErrorHandler('internal', 'Cache connection error'));
            } else if (result == 0) {
                callback(null,null);

            } else if (result == 1) {
                var newKey = key + ':' + value;
                redisClient.zrange(newKey,0, -1, function (err, obj) {
                    if (err) {

                        callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
                    } else if(!obj) {
                        callback(null, null);
                    }
                    else if(obj) {
                        callback(null, obj);
                    }
                });
            }
        });
    } else {

        callback (utilities.ErrorHandler('error', 'missing cache parameters',err));
    }
};


//Load the matching phrases and return them, using the HMGET (hash multiple get) command:
module.exports.hashMultipleGet = function(key, arr, callback) {
    if(key && redisClient){
        redisClient.exists(key, function (err, result) {
            if (err) {

                callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
            } else if (result == 0) {
                callback(null,null);

            } else if ((result == 1) && (arr.length > 0) ) {

                redisClient.hmget(key,arr, function (err, obj) {
                    if (err) {

                        callback (utilities.ErrorHandler('internal', 'Cache connection error',err));
                    } else {
                        callback(null, obj);
                    }
                });
            }else{
                callback(null,[]);
            }
        });
    } else {

        callback (utilities.ErrorHandler('error', 'missing cache parameters'));
    }
};
