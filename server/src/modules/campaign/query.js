module.exports = {
  getCampaignList(domain) {
    return `SELECT * FROM ryng_${domain}.campaign WHERE active= 1; `;
  },
};
