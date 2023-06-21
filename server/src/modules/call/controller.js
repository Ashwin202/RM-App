const runQuery = require('../../../db/runQuery')
const runQueryOne = require('../../../db/runQueryOne')
const getE164 = require('../../../lib/getE164')
const Fn = require('./function')
const QueryBuilder = require('./query')
const sendHTTPResponse = require('../../../lib/sendHTTPResponse')

const makeCall = async (request, response) => {
    try {
        const countryCode = request.tenantSettings.countryCode
        const phoneNumber = getE164(request.body.customNumber, countryCode)
        const domain = request.tenant
        const userId = request.session.user_id

        const activeAgentCalls = await runQuery(domain, QueryBuilder.getActiveAgentCalls(domain), [userId])
        const activeAgentProgressiveCalls = await runQuery(domain, QueryBuilder.getActiveAgentProgressiveCalls(domain), [userId])
        const dndList = await runQuery(domain, QueryBuilder.getDndList(domain))

        if (activeAgentCalls.length > 0 || activeAgentProgressiveCalls.length > 0) {
            throwError('Agent already has an active call', null, 200)
        }

        const customDialCampaign = await runQueryOne(domain, QueryBuilder.getCustomCampaignDetails(domain))
        const result = await runQuery(domain, QueryBuilder.getCustomCallStatus(domain), [phoneNumber, userId, customDialCampaign.id])

        if (result.length < 1) {

            const newCustomCall = {
                campaign_id: customDialCampaign.id,
                agent_id: userId,
                ph_num: phoneNumber,
                status: 1
            }
            const newCall = await runQuery(domain, QueryBuilder.addCall(domain), newCustomCall)
            await runQuery(domain, QueryBuilder.startCall(domain), [newCall.insertId])
            const resultCallDetails = await runQuery(domain, QueryBuilder.getCallDetails(domain), [newCall.insertId])
            resultCallDetails[0].customDialCampaignId = customDialCampaign.id
            await runQuery(domain, QueryBuilder.setCampaignNumCalls(domain), [customDialCampaign.id])

            const agentBreakID = null
            const lastLogStatus = await runQueryOne(domain, QueryBuilder.getLatestEventByAgent(domain), [request.user_id])?.event
            if (lastLogStatus === 'Disconnected' || lastLogStatus === 'Logged Out') {
                await runQuery(domain, QueryBuilder.setAgentStatusInEventLog(domain), [agentBreakID, 'Connected', request.user_id])
            }
            await runQuery(domain, QueryBuilder.setAgentStatusInEventLog(domain), [agentBreakID, 'resume', request.user_id])
            sendHTTPResponse.success(response, 'Call Details Fetched', resultCallDetails)

        } else {

            const callStatus = result[0].status
            const callId = result[0].id
            if (callStatus === 0 || callStatus === 2 || callStatus === 3) {
                const resultCallDetails = await runQuery(domain, QueryBuilder.getCallDetails(domain), [callId])

                const isDND = Fn.checkDNDList(resultCallDetails[0].ph_num, dndList)?.isDND
                if (isDND) {
                    sendHTTPResponse.success(response, 'Number Flagged as DND')
                    return
                }
                if (resultCallDetails.length) {

                    await runQuery(domain, QueryBuilder.startCall(domain), [callId])
                    resultCallDetails[0].customDialCampaignId = customDialCampaign.id

                    //update  agent resume status
                    const agentBreakID = null
                    const lastLogStatus = (await runQuery(domain, QueryBuilder.getLatestEventByAgent(domain), [request.user_id]))[0]?.event
                    if (lastLogStatus === 'Disconnected' || lastLogStatus === 'Logged Out') {
                        await runQuery(domain, QueryBuilder.setAgentStatusInEventLog(domain), [agentBreakID, 'Connected', request.user_id])
                    }
                    await runQuery(domain, QueryBuilder.setAgentStatusInEventLog(domain), [agentBreakID, 'resume', request.user_id])
                    sendHTTPResponse.success(response, 'Call Details Fetched', resultCallDetails)
                } else {
                    sendHTTPResponse.error(response, 'Call Details Fetched', resultCallDetails)
                }
                return
            } else {
                throwError('Call is already active', null, 200)
            }
        }

    } catch (error) {
        sendHTTPResponse.error(response, error.message)
    }
}
module.exports = {
    makeCall
}