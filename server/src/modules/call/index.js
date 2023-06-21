const router = require("express").Router()
const controller = require('./controller')

module.exports = {
    configure: () => {
        router.post('/make', controller.makeCall)
        return router;
    },
};