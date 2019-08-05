const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

let tasks = []

app.use(cors())
app.use(bodyParser.json())

app.post('/', (req,res) => {
    let task = req.body.task
    console.log('task saved!')
    res.json(task)
})

app.get('/',(req,res) => {
    res.json({tasks})
})

app.listen(3000, () => {
    console.log('Server is running...')
})