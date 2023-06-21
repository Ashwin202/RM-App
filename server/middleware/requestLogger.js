const Log = require('../log')

module.exports = async (request, response, next) => {
    Log.info(`[${request.tenant} | ${request.originalUrl}] ${request.method} query: ${JSON.stringify(request.query)} | body: ${JSON.stringify(request.body)}`)
    next()
}