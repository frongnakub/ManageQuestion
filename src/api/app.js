const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({
    extended: false
}))

// app.post('/', (req, res) => {
//     console.log("Trying to create a new question..")
//     console.log("How do we get data?")
    
//     console.log("First name : " + req.body.create_first_name)
//     const firstName = req.body.create_first_name
//     const lastName = req.body.create_last_name
    
//     getConnection().query('INSERT INTO users(first_name, last_name) VALUES (?, ?)', function (error, results, fields) {
//         if (error) { 
//             console.log(error) 
//             res.sendStatus(500)
//             return
//         }
        
//         console.log("Insert a new user with id: ", results.insertId);
//         res.end()
//     })
// })

function getConnection(){
    return mysql.createConnection({
        host: '34.221.181.184',
        user: 'proj',
        password: 'Oui_plic2',
        database: 'GrammarBE'
    })
}

const router = express.Router()
router.get('/messages', (req, res) => {
    console.log("Show some messages or whatever...")
    res.end()
})

app.use(router)

app.get('/questions', (req, res) => {
    console.log("Fetching question")
   
    const connection = getConnection()

    connection.query('SELECT question,description,lessonName,testTypeName FROM Question q join Lesson l on q.Lesson_LessonNo = l.LessonNo join Test t on q.test_testno = t.testno join TestType tt on t.testType_TestTypeNo = tt.testTypeNo', 
    function (error, rows, fields) {
        if (error) { 
            console.log(error) 
            res.sendStatus(500)
            throw error
        };
        console.log("I think we fetched successfully")
        res.json(rows)
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
})


app.get('/lessonName', (req, res) => {
    console.log("Fetching question")
   
    const connection = getConnection()

    connection.query('SELECT lessonNo,lessonName from Lesson', 
    function (error, rows, fields) {
        if (error) { 
            console.log(error) 
            res.sendStatus(500)
            throw error
        };
        console.log("I think we fetched successfully")
        res.json(rows)
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
})

app.post('/questions', (req, res) => {
    console.log("Add questions")

    const connection = getConnection()

    connection.query('INSERT INTO Question(question,description,test_testNo,lesson_lessonNo) VALUES (?,?,?,?)', 
    function (error, rows, fields) {
        if (error) { 
            console.log(error) 
            res.sendStatus(500)
            throw error
        };
        console.log("Add successfully")
        res.json(rows)
    })
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Methods',
        'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Option');
    next();
})
// app.get('/choices', (req, res) => {
//     console.log("Fetching question")
   
//     const connection = getConnection()

//     connection.query('SELECT question,choices,choiceType from Question q join Choice c on q.questionNo = c.question_questionNo', function (error, rows, fields) {
//         if (error) { 
//             console.log(error) 
//             res.sendStatus(500)
//             throw error
//         };
//         console.log("I think we fetched successfully")
//         res.json(rows)
//     })
//     res.setHeader('Access-Control-Allow-Origin', '*');
// })

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