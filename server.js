const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const debug = require('debug')('ManageQuestion:server.js');
const http = require('http');

const port = normalizePort(process.env.PORT || '3003');
app.set('port', port);

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())

function getConnection(){
    return mysql.createConnection({
        host: '54.68.60.227',
        user: 'proj',
        password: 'Oui_plic2',
        database: 'GrammarBE2'
    })
}

const router = express.Router()
router.get('/messages', (req, res) => {
    console.log("Show some messages or whatever...")
    res.end()
})

app.use(router)

// app.get('/questions', cors(), (req, res) => {
//     console.log("Fetching questions")
   
//     const connection = getConnection()

//     connection.query('SELECT questionNo,question,lessonName,testTypeName FROM Question q join Lesson l on q.Lesson_LessonNo = l.LessonNo join Test t on q.test_testno = t.testno join TestType tt on t.testType_TestTypeNo = tt.testTypeNo ', 
//     function (error, rows, fields) {
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


app.get('/lessonName', cors(), (req, res) => {
    console.log("Fetching lesson name")
   
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

// app.get('/subLessonName', cors(), (req, res) => {
//   console.log("Fetching sublesson name")
 
//   const connection = getConnection()

//   connection.query('SELECT subLessonNo, subLessonName from SubLesson', 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("I think we fetched successfully")
//       res.json(rows)
//   })
//   res.setHeader('Access-Control-Allow-Origin', '*');
// })

app.get('/testName', cors(), (req, res) => {
    console.log("Fetching test name")
   
    const connection = getConnection()

    connection.query('SELECT testTypeNo,testTypeName from Test t join TestType tt on t.testType_testTypeNo = tt.testTypeNo', 
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

// app.get('/question', cors(), (req, res) => {
//   console.log("Fetching question for add")
 
//   const connection = getConnection()

//   connection.query('SELECT questionNo, question from Question', 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("I think we fetched successfully")
//       res.json(rows)
//   })
//   res.setHeader('Access-Control-Allow-Origin', '*');
// })

// app.get('/lessonDetail', cors(), (req, res) => {
//   console.log("Fetching lesson detail")
 
//   const connection = getConnection()

//   connection.query('SELECT lessonDetailNo, lessonDescription, lessonName, sublessonName FROM LessonDetail ld JOIN Lesson l on ld.lesson_lessonNo = l.lessonNo JOIN SubLesson s on ld.sublessonNo = s.sublessonNo', 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("I think we fetched successfully")
//       res.json(rows)
//   })
//   res.setHeader('Access-Control-Allow-Origin', '*');
// })

app.get('/questions', cors(), (req, res) => {
  console.log("Fetching question")
 
  const connection = getConnection()

  connection.query('SELECT questionNo, question ,option1 , option2 , option3 , option4 , correctAnswer,lessonName,testTypeName FROM Question q join Lesson l on q.Lesson_LessonNo = l.LessonNo join Test t on q.test_testno = t.testno join TestType tt on t.testType_TestTypeNo = tt.testTypeNo ', 
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

app.post('/question',cors(), (req, res) => {
    console.log("Add questions")
    console.log(req.body.question)
    console.log(req.body.test_testNo)
    console.log(req.body.lesson_lessonNo)
    console.log(req.body.subLessonNo)
    const connection = getConnection()
    connection.query('INSERT INTO Question(question,test_testNo,lesson_lessonNo,sublessonNo) VALUES ("' + req.body.question + '",'+ req.body.test_testNo + ',' + req.body.lesson_lessonNo + ',' + req.body.subLessonNo + ')', 
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

// app.post('/lessonDetail',cors(), (req, res) => {
//   console.log("Add lesson detail")
//   console.log(req.body.lessonDescription)
//   console.log(req.body.lesson_lessonNo)
//   console.log(req.body.subLessonNo)
//   const connection = getConnection()
//   connection.query('INSERT INTO LessonDetail(lessonDescription,lesson_lessonNo,sublessonNo) VALUES ("' + req.body.lessonDescription + '",' + req.body.lesson_lessonNo + ',' + req.body.subLessonNo + ')', 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("Add successfully")
//       res.json(rows)
//   })
// })

// app.post('/choices',cors(), (req, res) => {
//   console.log("Add choices")
//   console.log(req.body.choices)
//   console.log(req.body.choiceType)
//   console.log(req.body.question_questionNo)
//   const connection = getConnection()
//   connection.query('INSERT INTO Choice(choices,choiceType,question_questionNo) VALUES ("' + req.body.choices + '","' + req.body.choiceType + '",' + req.body.question_questionNo + ')', 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("Add choices successfully")
//       res.json(rows)
//   })
// })

// app.post('/edit', (req, res) => {
//   console.log("Edit questions")
//   console.log(req.body.questionNo)
//   console.log(req.body.question)
//   console.log(req.body.test_testNo)
//   console.log(req.body.lesson_lessonNo)
//   console.log(req.body.subLessonNo)
//   const connection = getConnection()
//   connection.query('UPDATE Question SET question = "' + req.body.question + '", test_testNo = '+ req.body.test_testNo + ', lesson_lessonNo = ' + req.body.lesson_lessonNo + ', subLessonNo = ' + req.body.subLessonNo + ' WHERE questionNo = ' + req.body.questionNo, 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("Add successfully")
//       res.json(rows)
//   })
// })

// app.post('/edit/lesson', (req, res) => {
//   console.log("Edit lesson detail")
//   console.log(req.body.lessonDetailNo)
//   console.log(req.body.lessonDescription)
//   console.log(req.body.lesson_lessonNo)
//   console.log(req.body.subLessonNo)
//   const connection = getConnection()
//   connection.query('UPDATE LessonDetail SET lessonDescription = "' + req.body.lessonDescription + '", lesson_lessonNo = ' + req.body.lesson_lessonNo + ', subLessonNo = ' + req.body.subLessonNo + ' WHERE lessonDetailNo = ' + req.body.lessonDetailNo, 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("Edit lesson detail successfully")
//       res.json(rows)
//   })
// })

// app.post('/edit/choices', (req, res) => {
//   console.log("Edit choice")
//   console.log(req.body.choices)
//   console.log(req.body.choiceType)
//   console.log(req.body.choiceNo)
//   console.log(req.body.questionNo)
//   const connection = getConnection()
//   connection.query('UPDATE Choice SET choices = "' + req.body.choices + '", choiceType = "' + req.body.choiceType + '", question_questionNo = ' + req.body.questionNo + ' WHERE choiceNo = ' + req.body.choiceNo, 
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(500)
//           throw error
//       };
//       console.log("Edit choice successfully")
//       res.json(rows)
//   })
// })


app.get('/delete/(:questionNo)',cors(), (req, res) => {
  var user = {questionNo: req.params.questionNo}
  console.log("Delete question")
  console.log(req.params.questionNo)
  const connection = getConnection()
  connection.query('DELETE FROM Question WHERE questionNo = ' + req.params.questionNo,
  function (error, rows, fields) {
      if (error) { 
          console.log(error) 
          res.sendStatus(204)
          throw error
      };
      console.log("Delete question successfully")
      res.json(rows)
  })
})

// app.get('/delete/lesson/(:lessonDetailNo)',cors(), (req, res) => {
//   var user = {lessonDetailNo: req.params.lessonDetailNo}
//   console.log("Delete lesson detail")
//   console.log(req.params.lessonDetailNo)
//   const connection = getConnection()
//   connection.query('DELETE FROM LessonDetail WHERE lessonDetailNo = ' + req.params.lessonDetailNo,
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(204)
//           throw error
//       };
//       console.log("Lesson detail has been deleted successfully")
//       res.json(rows)
//   })
// })

// app.get('/delete/choices/(:choiceNo)',cors(), (req, res) => {
//   var user = {choiceNo: req.params.choiceNo}
//   console.log("Delete choice")
//   console.log(req.params.choiceNo)
//   const connection = getConnection()
//   connection.query('DELETE FROM Choice WHERE choiceNo = ' + req.params.choiceNo,
//   function (error, rows, fields) {
//       if (error) { 
//           console.log(error) 
//           res.sendStatus(204)
//           throw error
//       };
//       console.log("Choice has been deleted successfully")
//       res.json(rows)
//   })
// })



app.post('/login',cors(), (req, res) =>{
  console.log(req.body.username)
  password = req.body.password
  console.log(req.body.password)
  const connection = getConnection()
  connection.query('SELECT * FROM Admin WHERE username = "' + req.body.username + '"',
  function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }
    else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password){
          res.send({
            "code":200,
            "success":"login sucessfull"
          });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
          });
          console.log('The username and / or password is incorrect')
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
        });
      }
    }
  });
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


app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

//localhost:3003
app.listen(port, function () {
    console.log('Server running at http://localhost:' + port);
  });
  app.on('error', onError);
  app.on('listening', onListening);
  
  /**
   * Normalize a port into a number, string, or false.
   */
  
  function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
  /**
   * Event listener for HTTP server.js "error" event.
   */
  
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server.js "listening" event.
   */
  
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }