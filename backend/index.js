// import module
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
require('dotenv').config()


// main app
const app = express()

// apply middleware
app.use(cors())
app.use(bodyparser.json())



// setup mysql
// import connection
const db = require('./database')

db.connect((err) => {
    // console.log(err)
    // console.log(connection)
    if (err) return console.log(`error connecting : ${err.stack}`)
    console.log(`connected as id : ${db.threadId}`)
})




// main route
const response = (req, res) => res.status(200).send('<h1>API FINAL_PROJECT</h1>')
app.get('/', response)

//import router
const{productRouter} = require('./router')
app.use('/product', productRouter)


// bind to local machine
const PORT = process.env.PORT || 2000
app.listen(PORT, () => console.log(`CONNECTED : port ${PORT}`))