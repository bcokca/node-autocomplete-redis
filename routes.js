
var users = require('./functions/users.js');

module.exports.getRoutes = [

    {
        method: 'GET',
        path: '/',
        handler: {
            directory: { path: './example-usage', listing: false, index: true }
        }
    },

    {
        method: 'GET',
        path: '/test/health-check',
        config: {
            handler: users.healthCheck,
            cache: {
                expiresIn: 2000000,
                staleIn: 10000,
                staleTimeout: 500,
                mode: 'client+server'
            }
        }
    },
    {
        method: 'POST',
        path: '/improvement-plan/status',
        config: {
            handler: users.healthCheck,
            tags: [
                {
                    expireCache: '/improvement-plan/status',
                    expiration: 'cascade'
                },
                {
                    expireCache: '/evaluation/improvement-plan/{improvement_plan_id}',
                    expiration: 'cascade'
                },
                {
                    expireCache: '/evaluation/improvement-plan/goals/{goal_id}',
                    expiration: 'cascade'
                }
            ]
        }
    }


];
