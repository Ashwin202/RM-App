const router = require("express").Router()
const controller = require('./controller')
const authGuard = require('../../../middleware/authGuard')

module.exports = {
    configure: () => {
        router.post('/login', controller.login)
        router.get('/test', authGuard,  controller.login)
        return router;
    },
};