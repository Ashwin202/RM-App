const getConnection = require('./getConnection')
const executeQuery = require('./executeQuery')
const mainCluster = require('./index')

module.exports = async (domain, query, params) => (await executeQuery(await getConnection(mainCluster, domain), query, params))[0] ?? null