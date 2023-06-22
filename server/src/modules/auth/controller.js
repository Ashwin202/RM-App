module.exports = {
    login: async()=> {
        const url = 'POST /api/auth/login'

        try {
            console.log("first".blue)
        } catch (error) {
            Log.error(`[${domain} | ${url}| Error: ${error.message}`.red)
        }
    }
}