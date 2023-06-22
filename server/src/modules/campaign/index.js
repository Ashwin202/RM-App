const router = require("express").Router()
const controller = require('./controller')
const authGuard = require('../../../middleware/authGuard')

module.exports = {
    configure: () => {
        router.get('/list', controller.getCampaigns)
        router.get('/:id/calls', controller.getCampaignCalls)

        return router;
    },
};