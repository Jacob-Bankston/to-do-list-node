const express = require('express')
const app = express()

app.get('/', (res,req) => {
    res.setEncoding("Hello, Welcome to Node!")
})

app.listen(3000, () => {
    console.log('Server is running...')
})