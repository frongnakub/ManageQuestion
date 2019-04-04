const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.221.181.184',
    user: 'proj',
    password: 'Oui_plic2',
    database: 'GrammarBE'
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// connection.connect(function(err) {
//     if (err) throw err;
//     connection.query("SELECT * FROM Question", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

    connection.query('SELECT * FROM Question', function (error, results, fields) {
        if (error) { console.log(error) };
        console.log(results)
    });


//     connection.query('INSERT INTO question(`questionNo`, `question`, `description`) VALUES ("2","I am _______(go) to the mall.","Present continuous tense")', function (error, results) {
//     if (error) {
//         console.log(error)
//     };
//     console.log("add completed")
// });

// app.use((request, response, next) => {
//     response.header("Access-Control-Allow-Origin", +"*");
//     response.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     response.header('Cache-Control', 'no-cache');
//     next();
// });

// /////////////////////////////////////////QUERYYYYYYYYYYYYYYYYYYYYYY////////////////////////////////////////////////////
// app.get('/queryData', function (req, res) {

//     connection.query('SELECT * FROM Question', function (error, results, fields) {
//         if (error) { console.log(error) };
//         console.log(results)
//     });
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