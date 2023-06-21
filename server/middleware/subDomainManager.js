
module.exports = (request, response, next) => {
    const subdomain = request.subdomains[0]
    if (subdomain === undefined) {
        if (process.env.ENV == 'dev') {
            request.tenant = process.env.domain
            next()
            return
        }
        return response.json({ error: true, message: 'Invalid Tenant', data: {} })
    }
    request.tenant = subdomain
    next()
}