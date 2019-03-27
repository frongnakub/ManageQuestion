////////Use for XAMPP////////////
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grammarbe'
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

connection.query('SELECT * FROM Question', function (error, results, fields) {
    if (error) { console.log(error) };
    console.log(results)
});

// connection.query('INSERT INTO Question(`questionNo`, `question`, `description`) VALUES ("5","ssssssssss","sssssssss")', function (error, results) {
//     if (error) {
//         console.log(error)
//     };
//     console.log("add completed")
// });


/////////////////////////////////////////INSERTTTTTTTTTTTTTTTTTTTTTTTTTTTTT////////////////////////////////////////////////////
// app.post('/pushData', function (req, res) {
//     var data = req.body
//     console.log(req.ip + '  | Feed(Data) to Doxer :D')
//     connection.query('INSERT INTO Question(`name`, `pic`, `projName`) VALUES ("' + data.name + '","' + data.pic + '","' + data.projName + '")', function (error, results) {
//         if (error) {
//             console.log(error)
//             res.sendStatus(404)

//         } else {
//             res.send(results)
//         }
//     });
// });