const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql');

app.use(morgan('combined'))

app.get('/questions', (req, res) => {
    console.log("Fetching question")
    const connection = mysql.createConnection({
        host: '34.221.181.184',
        user: 'proj',
        password: 'Oui_plic2',
        database: 'GrammarBE'
    })

    connection.query('SELECT * FROM Question', function (error, rows, fields) {
        if (error) { 
            console.log(error) 
            res.sendStatus(500)
            throw err
        };
        console.log("I think we fetched successfully")
        res.json(rows)
    })
})

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

app.get("/users", (req, res) => {
    var user1 = {firstName : "Stephen", lastName: "Curry"}
    const user2 = {firstName : "Kevin", lastName: "Durant"}
    res.json([user1,user2])

    //res.send("Nodemon auto updates when I save this file")
})

//localhost:3003
app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})