const crypto = require('crypto')
const JWT = require('jsonwebtoken')
const fileStream = require('fs')
const path = require('path')
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem')
const PRIV_KEY = fileStream.readFileSync(pathToKey, 'utf8')
function validatePassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash  === hashVerify
}
function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return { salt, hash }
}
function issueJWT(userDetails) {
    const expireTime = '1d'
    // const payLoad = {
    //     _id: userDetails._id,
    //     sub: userDetails.userName, 
    //     type: userDetails.userType,
    //     iat: Date.now()
    // }
    const payLoad = {
        sub: userDetails._id,
        iat: Date.now()
    }
    const signedToken = JWT.sign(payLoad, PRIV_KEY, { expiresIn: expireTime, algorithm: 'RS256'} )
    return {
        token: 'Bearer ' + signedToken,
        expires: expireTime    
    }
}
module.exports.validatePassword = validatePassword
module.exports.generatePassword = generatePassword
module.exports.issueJWT = issueJWT