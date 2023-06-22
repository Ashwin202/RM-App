const runQuery = require("../../../db/runQuery");
const runQueryOne = require("../../../db/runQueryOne");
const getE164 = require("../../../lib/getE164");
const QueryBuilder = require("./query");
const sendHTTPResponse = require("../../../lib/sendHTTPResponse");
const Log = require("../../../log");

module.exports = {
  getCampaigns: async (request, response) => {
    console.log("first=======")
    const domain = request.tenant;
    try {
      const campaignList = await runQuery(domain, QueryBuilder.getCampaignList(domain))
      sendHTTPResponse.success(
        response,
        "Successfully Fetched all campaign list",
        campaignList
      );
    } catch (error) {
      Log.error(`${domain} | GET | getCampaigns | Error:${error.message} `);
      sendHTTPResponse.success(response, "Failed to fetch campaign list");
    }
  },
  getCampaignCalls: async (request, response) => {
    const url = 'GET /api/campaign/:id/calls'
    const domain = request.tenant
    const campaignID = request.params.id
    try {
      const calls = await runQuery(domain, QueryBuilder.getCampaignCallsByID(domain), [campaignID])
      const campaignInfo = await runQueryOne(domain, QueryBuilder.getCampaignInfo(domain), [campaignID])
      return sendHTTPResponse.success(response, 'Calls Fetched Successfully.', { calls, campaignInfo })
    } catch (error) {
      Log.error(`[${domain} | ${url}| Error: ${error.message}`.red)
      return sendHTTPResponse.error(response, error.message)
    }
  }
};
