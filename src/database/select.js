let mysql = require('mysql')
const connection = require('./connect') //Connection module

//Query
let sql = 'SELECT * FROM Question'
connection.query(sql,(error,results,fields) => {
    if (error) { console.log(error) };
    console.log(results)
})
connection.end()