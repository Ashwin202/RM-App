module.exports = {
    getActiveAgentCalls(domain) {
        return `SELECT *
                FROM ryng_${domain}.calls
                WHERE status = 1 and agent_id = ?`
    },
    getActiveAgentProgressiveCalls(domain) {
        return `SELECT *
                FROM ryng_${domain}.progressive_calls
                WHERE
                status IN (1,5) and agent_id = ?`
    },
    getDndList(domain) {
        return `SELECT id, num, created, addedByAdmin, addedByAgent 
                FROM ryng_${domain}.dnd_list`
    },
    getCustomCampaignDetails(domain) {
        return `SELECT *
                FROM ryng_${domain}.campaign
                WHERE
                type = 1`
    },
    getCustomCallStatus(domain) {
        return `SELECT id, status
                FROM ryng_${domain}.calls
                WHERE
                ph_num = ? AND agent_id = ? AND campaign_id = ?`
    },
    addCall(domain) {
        return `INSERT INTO ryng_${domain}.calls
                SET ?`
    },
    startCall(domain) {
        return `UPDATE ryng_${domain}.calls
                SET sid= null, status = 1, call_started = NOW()
                WHERE id = ?`
    },
    getCallDetails(domain) {
        return `SELECT CM.id AS campaign_id, CM.name as campaign_name, CL.id,
                    CL.notes, CL.disposition_id,
                    cust1,cust2,cust3,
                    cust4,cust5,cust6,cust7,
                    cust8,cust9,cust10,
                    cust11,cust12,cust13,
                    cust14,cust15,cust16,cust17,
                    cust18,cust19,cust20,
                    cust21,cust22,cust23,
                    cust24,cust25,
                    cust1_name, cust2_name,
                    cust3_name, cust4_name,
                    cust5_name, cust6_name,
                    cust7_name, cust8_name,
                    cust9_name, cust10_name,
                    cust11_name, cust12_name,
                    cust13_name, cust14_name,
                    cust15_name, cust16_name,
                    cust17_name, cust18_name,
                    cust19_name, cust20_name,
                    cust21_name, cust22_name,
                    cust23_name, cust24_name,
                    cust25_name,
                    num_cols,
                    ph_num,
                    CM.type,
                    CM.form_id
                FROM ryng_${domain}.calls AS CL
                INNER JOIN ryng_${domain}.campaign AS CM
                ON CL.campaign_id = CM.id
                WHERE CL.id = ? AND CM.active = 1`
    },
    setCampaignNumCalls(domain) {
        return `UPDATE ryng_${domain}.campaign
                SET num_calls = num_calls + 1
                WHERE id = ?`
    },
    getLatestEventByAgent(domain) {
        return `SELECT *
                FROM ryng_${domain}.event_log
                WHERE agent_id = ? AND event IN ("Logged In", "Connected", "Disconnected", "Logged Out")
                ORDER BY id DESC LIMIT 1;
                `
    },
    setAgentStatusInEventLog(domain) {
        return `INSERT INTO ryng_${domain}.event_log
                SET break_id = ?, event = ?, agent_id = ?`
    }
}