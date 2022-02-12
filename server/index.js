const express = require("express");
const cors = require("cors");
// const app = express().use("*", cors());
const app = express();
const jwt = require("jsonwebtoken");
const SocketServer = require("ws").Server;
app.use(express.json());
var whitelist = ["http://localhost:3400", undefined, "http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS - " + origin));
    }
  },
  credentials: "same-origin",
};
app.use(cors(corsOptions));

// const PORT = 3400;
// const server = express().listen(PORT, () =>
//   console.log(`Listening on ${PORT}`)
// );

const server = app.listen(3400, () => {
  console.log("Server Listening on port 3400");
});

const wss = new SocketServer({ server });
try {
  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (data) => {
      // console.log('data', data)

      let bufferToString = data.toString("utf8");

      console.log("bufferToString", bufferToString);
      // ws.send(data);
      let clients = wss.clients;

      clients.forEach((client) => {
        // client.send(String(data));
        client.send(bufferToString);
      });
    });

    ws.on("close", () => {
      // clearInterval(sendNowTime);
      console.log("Close connected");
    });
  });
} catch (wssErr) {
  console.log("wssErr", wssErr);
}
//---------------------------------------------------------------------
//---------------------------------------------------------------------
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "music_festival",
});

// console.log('connection', connection)
connection.connect((err) => {
  if (err) {
    return err;
  }
});
//---------------------------------------------------------------------------------------------
// 設定密鑰
const SECRET = "thisismynewproject";

//---------------------------------------------------------------------------------------------

app.get("/member/check_login", function (req, res) {
  // 從來自客戶端請求的 header 取得和擷取 JWT
  //   const token = req.header('Authorization').replace('Bearer ', '');
  const token = req.header("Authorization");
  // console.log('token', token);
  console.log("node_end_token", token);
  // var tokenTemp = req.header("Authorization").split(" ")[1];
  // console.log("tokenTemp", tokenTemp);
  if (token) {
    console.log("有token");
    console.log("種類", typeof token);
    try {
      // 驗證 Token
      const decoded = jwt.verify(token, SECRET);
      console.log("decoded", decoded);
      res.send({ msg: "已登入", statusCode: 200, userInfo: decoded.payload });
    } catch (tokenErr) {
      console.log("tokenErr", tokenErr);
      res.send({ msg: tokenErr + " 請重新登入", statusCode: 401 });
    }
  } else {
    console.log("localStorage沒有token，請重新登入");
    res.send({ msg: "token失效 請重新登入", statusCode: 402 });
  }
});
app.post("/member/get_avatar", (req, res) => {
  const getAvatarSQL = `SELECT mPhoto FROM member_info WHERE mNo = "${req.body.mNo}"`;
  connection.query(getAvatarSQL, (avatarError, avatarResult) => {
    if (avatarError) {
      console.log("avatarError", avatarError);
      res.status(avatarError.code).end();
    } else {
      console.log("avatarResult", avatarResult);
      if (avatarResult) {
        res.send(avatarResult);
      }
    }
  });
});

app.post("/member/login", (req, res) => {
  const checkAccountSQL = `SELECT * FROM member_info WHERE mAccount = "${req.body.account}"`;
  connection.query(checkAccountSQL, (loginError, loginResult) => {
    console.log("checkAccountSQL_loginResult", loginResult);
    if (loginResult && loginResult.length) {
      console.log("有此帳號");
      if (loginResult[0].mPwd === req.body.password) {
        // 建立 Token
        let payload = {
          mNo: loginResult[0].mNo.toString(),
          mAccount: loginResult[0].mAccount,
          mName: loginResult[0].mName,
          mBirthday: loginResult[0].mBirthday,
          mGender: loginResult[0].mGender,
          mPhone: loginResult[0].mPhone,
          mMail: loginResult[0].mMail,
          mAddress: loginResult[0].mAddress,
        };
        const token = jwt.sign(
          { payload, exp: Math.floor(Date.now() / 1000) + 60 * 3 },
          SECRET
        );
        console.log('token', token);
        res.send({ msg: "登入成功", token });
      } else {
        res.send("密碼錯誤");
      }
    } else {
      console.log("loginError", loginError);
      res.send("查無帳號");
    }
  });
});
//---------------------------------------------------------------------

app.post("/ticket_order/get_order_list", (req, res) => {
  console.log("req.body.mNo"); 
  const { mNo } = req.body; 
  const sql = `SELECT * FROM ticket_order WHERE mNo = ${req.body.mNo}`; 
  connection.query(sql, (error, results) => {
    console.log("error", error);
    // console.log('results', results)
    if (error) {
      res.send(error);
    } else {
      res.json(results);
    }
  });
});

app.post("/ticket_order/add", (req, res) => {
  const { userInfo, totalTickets, orderTime, orderStatus, orderPrice, paymentStatus, paymentMethod } = req.body;
  const { mNo, mAccount, mName, mPhone, mMail } = userInfo;

  const addTicketOrderSQL = `INSERT INTO ticket_order (mNo,mAccount,mName,mPhone,mMail,orderTime,orderStatus,orderPrice,paymentStatus,paymentMethod)
  VALUES("${mNo}","${mAccount}","${mName}","${mPhone}","${mMail}","${orderTime}",${orderStatus},${orderPrice},${paymentStatus},"${paymentMethod}")`;
  connection.query(addTicketOrderSQL, (insertTicketOrderError, insertTicketOrderResults) => {
    console.log("insertTicketOrderError", insertTicketOrderError);
    if (insertTicketOrderError) {
      res.send(insertTicketOrderError);
      console.log("insert_ticket_order_error", insertTicketOrderError);
    } else {
      // res.json(results);
      console.log("insert_ticket_order_results", insertTicketOrderResults);
      console.log(
        "insertTicketOrderResults.insertId",
        insertTicketOrderResults.insertId
      );

      return new Promise((resolve, reject) => {
        totalTickets.forEach((item, key) => {
          const ticketsSQL = `INSERT INTO tickets (orderNo,ticketType,singleTicketDay,campId) VALUES (${insertTicketOrderResults.insertId},"${item.ticketType}",${item.singleTicketDay},"${item.campId}")`;
          let inserTicketResultList = [];
          connection.query(
            ticketsSQL,
            (insertTicketsError, insertTicketsResults) => {
              if (insertTicketsError) {
                console.log("insertTicketsError", insertTicketsError);
                inserTicketResultList.push(insertTicketsError);
                reject(insertTicketsError);
              } else {
                console.log("insertTicketsResults", insertTicketsResults);
                inserTicketResultList.push(insertTicketsResults);
                if (key === totalTickets.length - 1) {
                  resolve(inserTicketResultList);
                }
              }
            }
          );
        });
      })
        .then((inserTicketsResponse) => {
          console.log("inserTicketsResponse", inserTicketsResponse);
          res.send({
            insertTicketOrderResults,
            inserTicketsResponse,
            statusMsg: "票券訂單成立",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });
});

// const nodeServer = http.createServer(app);

// nodeServer.listen(3400, () => {
//   console.log("server running at " + 3400);
// });

module.exports = app;
