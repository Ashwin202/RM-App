const passport = require('passport')
module.exports = (request, response, next) => {
    const authentication =  passport.authenticate('jwt', { session: false })
    next()
}