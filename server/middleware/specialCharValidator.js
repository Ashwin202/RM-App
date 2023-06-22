// const Log = require('../log')
const { BLOCKED_SPECIAL_CHARS } = require('../lib/constants')


const specialCharValidator = async (str) => {
    let isValid = true
    if (str) {
        if (BLOCKED_SPECIAL_CHARS.some(v => str.includes(v))) {
            isValid = false
        }
    }
    if (isValid)
        return str
    else return false
}

module.exports = specialCharValidator