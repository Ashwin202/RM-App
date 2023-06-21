const winston = require('winston')

require('dotenv').config()


if (process.env.ENV === 'production') {
    winston.level = 'verbose'
} else if (process.env.ENV === 'test') {
    winston.level = 'none'
} else {
    winston.level = 'silly'
}


if (process.env.LOG_LEVEL) {
    winston.level = process.env.LOG_LEVEL
}

winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {
    'timestamp': true
})


module.exports = winston
