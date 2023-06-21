const { hostOfDomain } = require('./index.js')
module.exports = (mainCluster, domain) => {
    const cluster = hostOfDomain(domain)
    return new Promise((resolve, reject) => {
        mainCluster.getConnection(cluster, (connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                resolve(connection)
            }
        })
    })
}