const checkUser = require('./authDBFunctions').checkUser
const Log = require('../log')
const fileStream = require('fs')
const path = require('path')
const JWTStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fileStream.readFileSync(pathToKey, 'utf8')
const domain = process.env.domain
const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: PUB_KEY, 
    algorithms: ['RS256']
}

module.exports = (passport) => {
    passport.use(new JWTStrategy(options, async (payload, done) => {
        const userDetails = await checkUser(domain, payload.sub)
        if(!userDetails) 
            return done(null, false)
        else 
            return done(null, {id: payload._id, userName: payload.sub, userType: payload.type})
    }))
}