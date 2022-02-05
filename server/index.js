const express = require("express");
const cors = require("cors");
// const app = express().use("*", cors());
const app = express();
const SocketServer = require("ws").Server;
app.use(express.json());
var whitelist = ['http://localhost:3400', undefined, 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS - '+origin))
    }
  },
  credentials: 'same-origin',
}
app.use(cors(corsOptions));

// const PORT = 3400;
// const server = express().listen(PORT, () =>
//   console.log(`Listening on ${PORT}`)
// );

const server = app.listen(3400, () => {
  console.log("Server Listening on port 3400");
});

const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    // console.log('data', data)

    let bufferToString = data.toString("utf8");

    console.log('bufferToString', bufferToString)
    // ws.send(data);
            let clients = wss.clients;

            clients.forEach(client => {
                // client.send(String(data));
                client.send(bufferToString);
            })
  });

  ws.on("close", () => {
    // clearInterval(sendNowTime);
    console.log("Close connected");
  });
});
//---------------------------------------------------------------------
//---------------------------------------------------------------------
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'music_festival',
})

// console.log('connection', connection)
connection.connect(err => {
  if (err) {
    return err
  }
})
const session = require('express-session');
const credentials = require("./credentials");
var MySQLStore = require('express-mysql-session')(session);

// --------------使用mySQL當作store------------------------------------------------------------
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'music_festival',
}

var sessionStore = new MySQLStore(options)
app.use(require('cookie-parser')(credentials.cookieSecret))
app.use(
  session({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 1000,
      secure: false
    },
  })
)



app.get('/ticket_order', (req, res) => {
  const sql = `SELECT * FROM ticket_order`;
  connection.query(sql, (error, results) => {
    console.log('error', error)
    // console.log('results', results)
    if (error) {
      res.send(error);
    } else {
      res.json(results);
    }
  })
})


app.get('/is_logined', function(req, res) {
  const { sessionId } = req.query
  console.log('node_end_sessionId', sessionId)
  if(sessionId) {
    console.log("有sessionId")
    console.log("種類", typeof sessionId);
    const checkLoginSQL = `SELECT * FROM sessions where session_id = '${sessionId}'`;
    connection.query(checkLoginSQL, (error, results) => {
      console.log('error', error)
      // console.log('check_results', results)
      if (error) {
        res.send(error);
      } else {
        if(results.length) {
          res.json(results[0]);
          req.session = results[0];
        } else {
        res.send("請重新登入");
        }
      }
    })
  } else {
    console.log("localStorage沒有sessionId");
  }
})


app.post('/user_login', (req, res) => {
  console.log('req.session', req.session);
  const checkAccountSQL = `SELECT * FROM member_info WHERE mAccount = "${req.body.account}"`;
  const loginSQL = `SELECT mNo, mAccount, mName, mBirthday, mGender, mPhone, mMail, mAddress, mPhoto, mPhotoBinary FROM member_info WHERE mAccount = "${req.body.account}" and mPwd = "${req.body.password}"`;
  connection.query(checkAccountSQL, (checkError, checkResult) => {
    console.log('checkAccountSQL_checkResult', checkResult);
    if(checkResult.length)  {
      console.log("有此帳號");
      connection.query(loginSQL, (loginError, loginResult) => {
        if(loginError) {
          console.log('loginError', loginError)
          res.status(loginError.code).end();
        } else {
          if(loginResult.length) {
            console.log('loginResult', loginResult);
            req.session.views = req.session.views || 0;
            req.session.views++;
            req.session.sessionId = req.sessionID;
            req.session.userInfo = loginResult[0];
            req.session.isLogined = true;
            
            res.send({...req.session.userInfo, sessionId:req.sessionID});
            console.log('req.session.userInfo', req.session.userInfo);
            console.log('req.session', req.session);
          } else {
            res.send("密碼錯誤");
          }
        }
      })
    } else {
      console.log('checkError', checkError)
      console.log("查無帳號");
      console.log('res', res);
      res.send("查無帳號");
    }

  });
})
//---------------------------------------------------------------------
app.post('/user_logout', (req, res) => {
  const deleteSessionSQL = `DELETE FROM sessions WHERE session_id = "${req.body.sessionId}"`;
  connection.query(deleteSessionSQL, (logoutError, logoutResult) => {
    if(logoutError) {
      console.log('logoutError', logoutError)
      res.status(logoutError.code).end();
    } else {
      console.log('logoutResult', logoutResult);
      if(logoutResult) {
        app.get('/');
        res.send("登出成功");
        req.session.destroy();
      } 
    }
  })
  
})


// const nodeServer = http.createServer(app);

// nodeServer.listen(3400, () => {
//   console.log("server running at " + 3400);
// });

module.exports = app;
