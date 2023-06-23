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
            SELECT c.name, c.num_calls, COALESCE(AG.username, AD.username) AS createdBy
            FROM ryng_${domain}.campaign c
            LEFT JOIN ryng_${domain}.agent AG ON c.created_by = AG.id AND c.creator_type = 1
            LEFT JOIN ryng_${domain}.admin AD ON c.created_by = AD.id AND c.creator_type = 0
            WHERE c.id = ?
        `
    }
}
