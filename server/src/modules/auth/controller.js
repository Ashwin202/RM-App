const QueryBuilder = require('../../../db/query')
const runQuery = require('../../../db/runQuery')
const sendHTTPResponse = require('../../../lib/sendHTTPResponse')
const Log = require('../../../log')
module.exports = {
    login: async(request, response)=> {
        //TO DO: Login attempts, 2FA
        const url = 'POST /api/auth/login'
        const domain = process.env.domain

        try {
            const username = request.body.username

            const result = await runQuery(domain, QueryBuilder.loginAgent(domain), [username])

            if (result.length > 0 && result[0].active) {
                const loginOtpStatus = await runQuery(domain, QueryBuilder.loginAgentWithOTP(domain), [username])
                loginOtpStatus[0].role = 'agent'
                const lastLogStatus = (await runQuery(domain, QueryBuilder.getLatestEventByAgent(domain), [loginOtpStatus[0].id]))[0]?.event
                if (lastLogStatus !== 'Logged In') await runQuery(domain, QueryBuilder.markAgentLog(domain), [loginOtpStatus[0].id, 'Logged In'])
                
                await runQuery(domain, QueryBuilder.updateAgentOTPVerification(domain), [loginOtpStatus[0].id])
                
                await runQuery(domain, QueryBuilder.setAgentInactive(domain), [loginOtpStatus[0].id])

                sendHTTPResponse.error(response, 'Logged In Successfully' , { role: loginOtpStatus[0].role }, 200)

            }
        } catch (error) {
            Log.error(`[${domain} | ${url}| Error: ${error.message}`.red)
        }
    }
}
