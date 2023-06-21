const router = require("express").Router();
const controller = require('./controller')
const requestLogger = require('../../../middleware/requestLogger')
const authGuard = require('../../../middleware/authGuard')

module.exports = {
    configure: ({ app }) => {
        router.use(requestLogger)
        router.post('/login', controller.login)
        router.get('/test', authGuard,  controller.login)

        return router;
    },
};