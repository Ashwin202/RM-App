const router = require("express").Router()
const controller = require('./controller')
const authGuard = require('../../../middleware/authGuard')

module.exports = {
    configure: () => {
        router.post('/list', controller.getCampaigns)

        return router;
    },
};