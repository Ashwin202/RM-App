const validatePassword = require('../lib/passwordUtils').validatePassword
const checkUser = require('./authDBFunctions').checkUser
const issueJWT = require('../lib/passwordUtils').issueJWT
const Log = require('../log')

const domain  = process.env.tenant

module.exports = async (request, response, next) => {
    const userDetails = await checkUser(domain, request.body.username)
    if(!userDetails) {
        Log.debug('Failed to Login: User not found')
        response.status(401).json({
            error: true, 
            message: 'User not found',
            data: {}
        })
    }
    const isValid = validatePassword(request.body.password, userDetails.hash, userDetails.salt)
    
    if(isValid) {
        Log.info('Login verified successfully')
        const tokenDetails = issueJWT({_id: userDetails.id, userType: request.body.userType, userName: request.body.username})
        response.locals.token = tokenDetails.token,
        response.locals.expireTime = tokenDetails.expires
        next()
    } else {
        Log.debug('Failed to Login: incorrect password')
        response.status(401).json({
            error: true, 
            message: 'Failed to Login: incorrect password',
            data: {}
        })
    }
}