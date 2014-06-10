
// first things first
// let the test robot beleive we are running localy
process.env.NODE_ENV = 'local'; // or 'production' or 'test'

// Prepare test environment
var express = require('express');
var redis = require("redis");
var app = express();
var Hapi = require('hapi');
//var mySqlConfiguration = require('../../config/configuration');
//var db = require('../../includes/database');
//var session = require("../../includes/session.js");
//var config = require("../../tests/config/configuration_test.js");
var cache = require("../lib/cache.js");
//var cacheMap = require("../../includes/cache-map.js");
//redisClient = redis.createClient(apiCache.port, apiCache.host);
//API_Routes = require('../../routes');



//application-wide utilities and assorted candies
//var utilities = require('../../includes/utilities');


//we need to prepare our redis client first for test



describe("cache.js test", function(){

    //add some keys to redis
    beforeEach(function () {
        cache.set('burhan', 10, function(err){
           if(err){
               console.log('error occurred during beforeEach method', err);
           }
        });
    });


    afterEach(function () {
        cache.del('burhan', function(error){
           if(error){
               console.log('error occurred during deletion afterEach method', error);
           }
        })
    });


    it("get method should return 10", function () {

        runs(function() {
            cache.get('burhan', function(err, obj){
                expect(err).toBe(null);
                expect(obj).toEqual(10);
            });

        });

    });


});

/*

describe("cache-map.js expiresRoutesCache test", function(){
    it("expire cache", function () {
        runs(function() {
            //first cache our route
            var routeForCache = 'hapi-cache:%2Fschool%2F%3F%2Fforms:%2Fschool%2F20%2Fforms';
            var testValue = [{test:'this is for test'}];
            cache.set(routeForCache, testValue, function(err,result){
                expect(err).toEqual(null);
            });
        });
        runs(function() {
            //call expire cache
            var paramArray = [{key:'school_id', value:config.school_id},{key:'user_id', value:config.district_admin.id}];

            cacheMap.expireRoutesCache(utilities.findPathName('addSchoolEntityFormsSettings'), function(err,result){
                expect(err).toEqual(null);
                expect(result[0].expireCache).toEqual('/school/{school_id}/forms');
            }, paramArray);

        });
    });


});

  */