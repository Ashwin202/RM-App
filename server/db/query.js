const CONSTANTS = require("../lib/constants")

module.exports = {
    getAgent(domain) {
        return `SELECT * FROM ryng_${domain}.agent WHERE id = ?`
    },
    loginAgent(domain) {
        return `SELECT password, id, firstname, lastname, username,active,num
                FROM ryng_${domain}.agent
                WHERE username = ?`
    },
    getExotelDetails(domain) {
        return `SELECT exotelSid, v_num, v_num_list,
                exotelToken, exotelKey,
                callbackUrl, executor_id,
                DltEntityId, DltTemplateId,callflow_url
                FROM ryng_default.organisation
                WHERE domain_name = '${domain}';`
    },
    loginAgent(domain) {
        return `SELECT password, id, firstname, lastname, username,active,num, salt, hash
                FROM ryng_${domain}.agent
                WHERE username = ?`
    },loginAgentWithOTP(domain) {
        return `SELECT password, id, firstname, lastname, username, active, otp_code, sms_active, num, attempts, TIMESTAMPDIFF(SECOND,otp_created_time,CURRENT_TIMESTAMP()) as timediff
                FROM ryng_${domain}.agent
                WHERE username = ?`
    },
    getLatestEventByAgent(domain) {
        return `SELECT *
                FROM ryng_${domain}.event_log
                WHERE agent_id = ? AND event IN ("Logged In", "Connected", "Disconnected", "Logged Out")
                ORDER BY id DESC LIMIT 1;
                `
    },
    markAgentLog(domain) {
        return `INSERT INTO ryng_${domain}.event_log
                SET agent_id = ?, event = ?`
    },
    updateAgentOTPVerification(domain) {
        return `UPDATE ryng_${domain}.agent
                SET sms_active=0, attempts=0
                WHERE id = ?`
    },
    setAgentInactive(domain) {
        return `UPDATE ryng_${domain}.agent
                SET status = ${CONSTANTS.AGENT_IDLE}
                WHERE id= ?`
    }
}