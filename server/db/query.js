module.exports = {
    loginAgent(domain) {
        return `SELECT password, id, firstname, lastname, username,active,num, salt, hash
                FROM ryng_${domain}.agent
                WHERE username = ?`
    }
}