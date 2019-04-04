let mysql = require('mysql')
var connection = require('./connect') //Connection module

//Query
let sql = 'SELECT * FROM Question'
connection.query(sql,(error,results,fields) => {
    if (error) { console.log(error) };
    console.log(results)
})
connection.end()