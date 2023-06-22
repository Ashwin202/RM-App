const Log = require('../log')
const specialCharValidator = require('./specialCharValidator')
module.exports = async (request, response, next) => {
    Log.debug('Inside specialCharValidator')
    const username = await specialCharValidator(request.body.username)
    const password = await specialCharValidator(request.body.password)

    if (!username || !password) {
        Log.debug('Failed to validate credentials')
        response.status(400).json({
            error: true,
            message: 'Invalid Special Characters used in Username/Password',
            data: {}
        })
        return
    } else next()
}