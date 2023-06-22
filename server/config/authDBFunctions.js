const QueryBuilder = require('../db/query')
const runQueryOne = require('../db/runQueryOne')
const checkUser = async (domain, userName) => await runQueryOne(domain, QueryBuilder.loginAgent(domain), [userName]) 
module.exports.checkUser = checkUser