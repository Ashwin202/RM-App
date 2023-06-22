const router = require("express").Router();
const controller = require('./controller')
const requestLogger = require('../../../middleware/requestLogger')
const validateCredentials = require('../../../middleware/validateCredentials')
const verificationMiddleware = require('../../../config/verificationMiddleware')

const passport = require('passport')

module.exports = {
    configure: ({ app }) => {
        router.use(requestLogger)
        router.post('/login', validateCredentials, verificationMiddleware, controller.login)
        router.get('/protected', passport.authenticate('jwt', { session: false }), (request, reponse) => {
            console.log('Checking request session: ', request.session)
            reponse.status(200).json({ error: false, message: "You are successfully authenticated to this route!", data: {}});
        });

        return router;
    },
};