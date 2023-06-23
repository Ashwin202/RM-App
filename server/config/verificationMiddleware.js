const validatePassword = require('../lib/passwordUtils').validatePassword
const checkUser = require('./authDBFunctions')
const issueJWT = require('../lib/passwordUtils').issueJWT
const sendHTTPResponse = require('../lib/sendHTTPResponse')
const Log = require('../log')

const domain  = process.env.domain

module.exports = async (request, response, next) => {
    const userDetails = await checkUser(domain, request.body.username)
    if(!userDetails) {
        Log.error('Failed to Login: User not found'.red)
        sendHTTPResponse.error(response, 'User not found', {}, 401)
    }
    const isValid = validatePassword(request.body.password, userDetails.hash, userDetails.salt)
    
    if(isValid) {
        Log.info('Login verified successfully')
        const tokenDetails = issueJWT({_id: userDetails.id, userType: request.body.userType, userName: request.body.username})
        response.locals.token = tokenDetails.token,
        response.locals.expireTime = tokenDetails.expires
        next()
    } else {
        Log.error('Failed to Login: incorrect password')
        sendHTTPResponse.error(response, 'Failed to Login: incorrect password', {}, 401)
    }
}