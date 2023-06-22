const jwt = require('jsonwebtoken')
const Log = require('../log')
const Query = require('../db/query')
const runQueryOne = require('../db/runQueryOne')

module.exports = async (request, response, next) => {
    try {
        let isError = false
        const authHeader = request.headers["Authorization"] || request.headers["authorization"]
        if (!authHeader) {
            isError = true
            return response.status(401).json({ message: "authorization must be provided" })
        }
        const token = authHeader && authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if (err) {
                isError = true
                return response.status(401).json({ message: "Unauthorised" })
            }

            if (!isError) {
                const { id, username, user_type, iat } = payload
                try {
                    const domain = request.tenant
                    const user = await runQueryOne(domain, Query.getAgent(domain), [id])
                    if (!user) {
                        return response.status(401).json({ message: "Session Expired! Please log in again." })
                    }
                    request.user = user
                    next()
                } catch (err) {
                    Log.error(`${err.message}`.red)
                    return response.status(401).json({ message: "Authorization Error" })
                }

            }

        })
    } catch (err) {
        Log.error(`${err}`.red)
    }
}
