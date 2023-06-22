module.exports = {
    getCampaignList(domain) {
        return `SELECT * FROM ryng_${domain}.campaign WHERE active= 1;`;
    },
    getCampaignCallsByID: (domain) => {
        return `
            SELECT c.*, COUNT(l.id) AS log_count
            FROM ryng_${domain}.calls AS c
            LEFT JOIN ryng_${domain}.log AS l ON c.ph_num = l.to_num
            WHERE c.campaign_id = ?
            GROUP BY c.id
        `
    },
    getCampaignInfo: (domain) => {
        return `
            SELECT name, num_calls FROM ryng_${domain}.campaign
            WHERE id = ?
        `
    }
}
