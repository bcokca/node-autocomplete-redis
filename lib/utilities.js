

function  ErrorHandler (errorType, errorMessage, error) {

    if (errorType=='internal') {

        // we have to track serious internal errors!
        console.log('debug',errorMessage , error) ;

        // i don't know why; sometime hapi error handler don't send response to client in case of internal error; causing server to go in suspended mode
        // so I turn back a response here...
        //Hapi.request.reply (Hapi.error.internal(errorMessage, error));

        //return (Hapi.error.internal(errorMessage, error));
        //we have to handle errors
        return null;
    }

    else if (errorType=='badRequest') {
        //log.info (errorMessage) ;
        //return (Hapi.error.badRequest(errorMessage));
        //we have to handle errors
        return null;
    }

    else if (errorType=='forbidden') {
        //log.info (errorMessage) ;
        //return (Hapi.error.forbidden(errorMessage));
        //we have to handle errors
        return null;
    }

    else if (errorType=='unauthorized') {
        console.log('debug',errorMessage , error) ;

        //return (Hapi.error.unauthorized(errorMessage  + error));
        //we have to handle errors
        return null;
    }

    //return (Hapi.error.internal(errorMessage));
    //we have to handle errors
    return null;

};
exports.ErrorHandler = ErrorHandler;


//cache settings
exports.redisConfiguration = {
    engine: 'redis',
    host: '127.0.0.1',
    port: '6379'
};

