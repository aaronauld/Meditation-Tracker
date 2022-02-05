require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

app.options('http://localhost:3001/', cors())

const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter)

app.listen(3001, () => console.log('Server Started'))