module.exports = (connection, query, vals) => {
    return new Promise((resolve, reject) => {
        connection.query(query, vals, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
            connection.release()
        })
    })
}


