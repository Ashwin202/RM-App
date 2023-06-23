const Log = require('../log')
const specialCharValidator = require('./specialCharValidator')
const sendHTTPResponse = require('../lib/sendHTTPResponse')
module.exports = async (request, response, next) => {
    Log.debug('Inside specialCharValidator')
    const username = await specialCharValidator(request.body.username)
    const password = await specialCharValidator(request.body.password)

    if (!username || !password) {
        Log.debug('Failed to validate credentials')
        sendHTTPResponse.error(response, 'Invalid Special Characters used in Username/Password', {}, 400)
        return
    } else next()
}