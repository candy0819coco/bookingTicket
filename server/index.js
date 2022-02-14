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

      // console.log("bufferToString", bufferToString);
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
          { payload, exp: Math.floor(Date.now() / 1000) + 60 * 30 },
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

app.get("/member/check_login", function (req, res) {
  const token = req.header("Authorization");
  console.log("node_end_token", token);
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

app.post("/ticket_order/get_list", (req, res) => {
  const { mNo } = req.body;
  const getTicketOrderSQL = `SELECT * FROM ticket_order WHERE mNo = ${mNo}`;
  connection.query(getTicketOrderSQL, (error, ticketOrderListResult) => {
    console.log("error", error);
    if (error) {
      res.send(error);
    } else {
      console.log('ticketOrderListResult', ticketOrderListResult);
      let getTicketOrderResultList = [];
      return new Promise((resolve, reject) => {
        ticketOrderListResult.forEach((item, key) => {
          const getTicketsSQL = `SELECT * FROM tickets WHERE orderNo = ${item.orderNo}`;
          
          connection.query(
            getTicketsSQL,
            (ticketsError, ticketsResults) => {
              if (ticketsError) {
                console.log("ticketsError", ticketsError);
                reject(ticketsError);
              } else {
                console.log("ticketsResults", ticketsResults);
                getTicketOrderResultList.push({...item, tickets: ticketsResults});
                console.log('getTicketOrderResultList', getTicketOrderResultList)
                if (key === ticketOrderListResult.length - 1) {
                  resolve(getTicketOrderResultList);
                }
              }
            }
          );
        });
      })
        .then((ticketsResponse) => {
          console.log("ticketsResponse", ticketsResponse);
          res.send({
            data:ticketsResponse,
            statusMsg: "票券訂單查詢成功",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });
});

app.get("/ticket_order/get_camp", function (req, res) {
  const getCampSQL = `SELECT * FROM camp`; 
  connection.query(getCampSQL, (getCampError, getCampResult) => {
    if (getCampError) {
      console.log("getCampError", getCampError);
      res.status(getCampError.code).end();
    } else {
      console.log("getCampResult", getCampResult);
      if (getCampResult) {
        res.send(getCampResult);
      }
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
        let insertTicketResultList = [];
        totalTickets.forEach((item, key) => {
          const ticketsSQL = `INSERT INTO tickets (orderNo,ticketType,singleTicketDay,campId) VALUES (${insertTicketOrderResults.insertId},"${item.ticketType}",${item.singleTicketDay},"${item.campId}")`;
          connection.query(
            ticketsSQL,
            (insertTicketsError, insertTicketsResults) => {
              if (insertTicketsError) {
                console.log("insertTicketsError", insertTicketsError);
                insertTicketResultList.push(insertTicketsError);
                reject(insertTicketsError);
              } else {
                console.log("insertTicketsResults", insertTicketsResults);
                insertTicketResultList.push(insertTicketsResults);
                if (key === totalTickets.length - 1) {
                  resolve(insertTicketResultList);
                }
              }
            }
          );
        });
      })
        .then((insertTicketsResponse) => {
          console.log("insertTicketsResponse", insertTicketsResponse);
          res.send({
            insertTicketOrderResults,
            insertTicketsResponse,
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
