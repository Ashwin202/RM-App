const fs = require('fs')
const mysql = require('mysql')
const Log = require('../log')
const clusters = require('./clusters.json')

const poolCluster = mysql.createPoolCluster({
    removeNodeErrorCount: 1,
    restoreNodeTimeout: 1000 * 10
})

const DEFAULT_CLUSTER = 'default'
const domainHosts = Object.create({})
const isSslEnabled = (ssl) => `ca: ${ssl.ca ? 'enabled' : 'disabled'} key: ${ssl.key ? 'enabled' : 'disabled'} cert: ${ssl.cert ? 'enabled' : 'disabled'}`

for (const cluster of clusters) {
    cluster.config.connectionLimit =
        cluster.config.connectionLimit
            ? cluster.config.connectionLimit
            : 100
    const domains = cluster.domains
    if (cluster.config.ssl) {
        if (cluster.config.ssl.ca) cluster.config.ssl.ca = fs.readFileSync(__dirname + '/../ssl/' + cluster.config.ssl.ca)
        if (cluster.config.ssl.key) cluster.config.ssl.key = fs.readFileSync(__dirname + '/../ssl/' + cluster.config.ssl.key)
        if (cluster.config.ssl.cert) cluster.config.ssl.cert = fs.readFileSync(__dirname + '/../ssl/' + cluster.config.ssl.cert)
    }
    domains.forEach(domain => domainHosts[domain] = cluster.hostname)
    poolCluster.add(cluster.hostname, cluster.config)
    Log.info(`Adding cluster [${cluster.hostname}] to pool hostname: ${cluster.config.host} Connection Limit: ${cluster.config.connectionLimit} ssl: ${cluster.config.ssl ? isSslEnabled(cluster.config.ssl) : 'disabled'} Domains: ${domains}`)
}

poolCluster.on('remove', function (nodeId) {
    Log.error(`Node ${nodeId} removed from cluster`)
})

poolCluster.on('offline', function (nodeId) {
    Log.error(`Node ${nodeId} offline`)
})

poolCluster.on('online', function (nodeId) {
    Log.info(`Node ${nodeId} online`)
})

poolCluster.on('release', function (connection) {
    Log.debug(`Connection ID ${connection.threadId} released`)
})

poolCluster.on('connection', function (connection) {
    Log.debug(`Connection ID ${connection.threadId} connected`)
})

poolCluster.on('acquire', function (connection) {
    Log.debug(`Connection ID ${connection.threadId} acquired`)
})

poolCluster.on('enqueue', function () {
    Log.debug('Waiting for available connection slot')
})

poolCluster.on('error', function (err) {
    Log.error(`Database Error ${err.code}`)
})

poolCluster.getClusters = function getClusters() {
    return clusters
}

poolCluster.hostOfDomain = function hostOfDomain(domain) {
    if (!domain) return DEFAULT_CLUSTER
    const host = domainHosts[domain]
    return host ? host : DEFAULT_CLUSTER
}

module.exports = poolCluster