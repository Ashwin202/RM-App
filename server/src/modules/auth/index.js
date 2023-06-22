const Log = require('../../../log')
const router = require("express").Router()
const controller = require('./controller')
const requestLogger = require('../../../middleware/requestLogger')
const validateCredentials = require('../../../middleware/validateCredentials')
const verificationMiddleware = require('../../../config/verificationMiddleware')
const authenticationMiddleware = require('../../../config/authenticationMiddleware')

const passport = require('passport')

module.exports = {
    configure: ({ app }) => {
        router.use(requestLogger)
        router.post('/login', validateCredentials, verificationMiddleware, controller.login)
        router.get('/protected', authenticationMiddleware, (request, reponse) => {
            Log.info('Verified route | /protected')
            reponse.status(200).json({ error: false, message: "You are successfully authenticated to this route!", data: {}});
        });

        return router;
    },
};