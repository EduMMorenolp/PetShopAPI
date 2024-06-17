const express = require('express')
const homeRouter = require('./routes/home.routes')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())

app.use('/', homeRouter)

app.listen(PORT, () => {
    console.log('\n==================================================')
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    console.log('==================================================\n')
})