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


//--------------------------票券部分-------------------------------------------
app.get('/ticket_order', (req, res) => {
  const sql = `SELECT * FROM ticket_order`;//選票券訂單的資料庫
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
app.post('/ticket_order_post', (req, res) => {
  console.log("req.body.mNo");//req.body=data
  const { mNo, randos } = req.body;//把req.body解構出來，就是當初打AIXOS裡的data
  const sql = `SELECT * FROM ticket_order WHERE mNo = ${req.body.mNo}`;//WHERE是給mNO條件，選票券訂單的資料庫
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

//購買單日&雙日票 寫進ticket_order資料庫
app.post('/create_ticket_order',(req,res)=>{
  const { mNo, totalTickets, mName, orderTime } = req.body;//把req.body解構出來，就是當初打AIXOS裡的data
  const sql = `INSERT INTO ticket_order (mNo,mAccount,mName,mPhone,mMail,orderTime,orderStatus,orderPrice,paymentStatus,paymentMethod)
  VALUES('${mNo}',"${mAccount}","${mName}","${mPhone}","${mPhone}",${null},${0},${3600},${0},"${paymentMethod}" )`;
    
  connection.query(sql,(error,results) => {
      console.log("error",error)
      if (error){
        // res.send(error);
        console.log('insert_ticket_order_error', error)
      }else{
        // res.json(results);
        console.log('insert_ticket_order_results', results)
        console.log('results.insertId', results.insertId);

        totalTickets.forEach((item, key)=>{//為了不只買一張，這裡要寫迴圈
          const ticketsSQL = `INSERT INTO tickets (orderNo,ticketType,singleTicketDay,campId) 
          VALUES (${results.insertId},"${item.ticketType}",${item.singleTicketDay},${item.campId})`
          connection.query(ticketsSQL,(insertTicketsError,insertTicketsResults) =>{
            if(insertTicketsError) {
              console.log('insertTicketsError', insertTicketsError)
              // res.send(insertTicketsError);
            } else {
              console.log('results', insertTicketsResults)
              res.send(insertTicketsResults);
            }
          })
        })
      }
    })
})
//---------------------------------------------------------------------

app.get('/is_logined', function(req, res) {
  const { sessionId } = req.query
  console.log('node_end_sessionId', sessionId)
  if(sessionId) {
    console.log("有sessionId")
    console.log("種類", typeof sessionId);
    const checkLoginSQL = `SELECT * FROM sessions where session_id = '${sessionId}'`;//這個資料表是放在哪裡
    connection.query(checkLoginSQL, (error, results) => {
      console.log('error', error)
      // console.log('check_results', results)
      if (error) {
        res.send(error);
      } else {
        if(results.length) {
          res.json(results[0]);//這裡不懂 把[0]JSON化
          req.session = results[0];//這裡不懂
        } else {
        res.send("請重新登入");//124行不是已經有錯誤會顯示的方式嗎
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
