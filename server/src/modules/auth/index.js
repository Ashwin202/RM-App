const router = require("express").Router()
const controller = require('./controller')

module.exports = {
    configure: () => {
        router.post('/login', controller.login)
        return router;
    },
};