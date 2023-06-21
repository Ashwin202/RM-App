

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
}