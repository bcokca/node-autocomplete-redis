// ---------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------     LOAD LIBRARIES -----------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------

// Loading node modules
var http = require('https');

// var conn = require('./database');
//var configuration = require('./config/configuration');

// application-wide utilities and assorted candies
//var utilities = require('./includes/utilities');

var redis = require("redis");

// cache, user classes, route js
API_Routes = require('./routes');

// Loading Hapi libraries
var Hapi = require('hapi');

/*

// exception handling
process.on('exit', function () {
    console.log(process.env.NODE_ENV + 'About to exit.');
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err.message + '-' + err.stack);

});
  */
// Main function
//internals.main = function () {

    var http = new Hapi.Server('localhost', 8000);

    // Start redis connection
    redisClient = redis.createClient('6379', '127.0.0.1');
    redisClient.select('10', function(err) { if(err)	console.log(err); });

    // Add the API routes and wait until onions are going pink.:P

    http.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: { path: './angular-linkedin', listing: false, index: true }
        }
    });


   // http.addRoutes(API_Routes.getRoutes);

    // Ignite the server
    http.start(function () {
        console.log('Server started at: ' + http.info.uri);
    });

//};


//internals.main();

