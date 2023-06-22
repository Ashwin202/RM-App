const crypto = require('crypto')
const fileStream = require('fs')

function generateKeyPair() {

    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem', 
        }, 
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem', 
        }
    })

    fileStream.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey)
    
    fileStream.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey)

}

generateKeyPair()