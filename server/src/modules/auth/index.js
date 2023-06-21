const router = require("express").Router();
const controller = require('./controller')
const requestLogger = require('../../../middleware/requestLogger')

module.exports = {
    configure: ({ app }) => {
        router.use(requestLogger)
        router.post('/login', controller.login)

        return router;
    },
};