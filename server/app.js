const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

let tasks = []

app.use(cors())
app.use(bodyParser.json())

app.post('/todos',(req,res) => {

    let title = req.body.title
    let priority = req.body.priority
    let dateCreated = req.body.dateCreated
    let dateCompleted = req.body.dateCompleted
    let isCompleted = req.body.isCompleted

    task = {
        title: title,
        priority: priority,
        dateCreated: dateCreated,
        dateCompleted: dateCompleted,
        isCompleted: isCompleted
    }

    tasks.push(task)
    res.send({
        saved: true
    })
})

app.delete('/todos',(req,res) => {

    let title = req.body.title
    let priority = req.body.priority
    let dateCreated = req.body.dateCreated
    let dateCompleted = req.body.dateCompleted
    let isCompleted = req.body.isCompleted

    task = {
        title: title,
        priority: priority,
        dateCreated: dateCreated,
        dateCompleted: dateCompleted,
        isCompleted: isCompleted
    }


    let index = tasks.indexOf(task);
    if (index > -1) {
    tasks.splice(index, 1);
    }

    res.send({
        saved: true
    })
})

app.get('/todos',(req,res) => {
    res.json(tasks)
})

app.listen(3000, () => {
    console.log('Server is running...')
})