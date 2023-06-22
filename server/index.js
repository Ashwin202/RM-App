const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const colors = require('colors')
const { readdirSync } = require('fs');
const Log = require('./log')
const ip = require('ip')
const tenantMiddleware = require('./middleware/subDomainManager')
const path = require('path');
const passport = require('passport');
const requestLogger = require('./middleware/requestLogger')

require('dotenv').config()
require('./config/passport')(passport);

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use(tenantMiddleware)
app.use(passport.initialize());

const getDirectories = source => readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

const modules = getDirectories("./src/modules")

modules.forEach((moduleName) => {
    const appModule = require(`./src/modules/${moduleName}`)
    if (typeof appModule.configure === 'function') {
        app.use(`/api/${moduleName}`, appModule.configure({ app }))
    }
})

app.use((error, request, response, next) => {
    console.log(`error ${error.message}`)
    const status = error.status || 400
    response.status(status).send(error.message)
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    Log.info(`Running App on http://${ip.address()}:${process.env.PORT}`.green)
})