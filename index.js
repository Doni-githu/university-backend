const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/user')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Success' })
})
app.use(express.json())
app.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use('/api/user', userRoute)

function Run() {
    const PORT = process.env.PORT || 8000
    mongoose.connect(process.env.GLOBAL_URI)
        .then(() => console.log('Mongo DB connected'))
        .catch((err) => console.log('Mongo DB could not connect because ' + err))
    app.listen(8000, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

Run()