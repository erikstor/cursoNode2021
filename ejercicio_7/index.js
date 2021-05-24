const express = require('express')
const app = express()

app.use(express.json())

//routes
const car = require('./routes/cars')
app.use('/api/cars', car)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))