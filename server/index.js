const bodyParser = require("body-parser");//wen---
const express = require("express");
const cors = require("cors");
const app = express().use("*", cors());
const SocketServer = require("ws").Server;
const mysql = require("mysql");


const { body, validationResult, cookie } = require("express-validator");//驗證各輸入資料
const bcrypt = require("bcrypt");//加密(單向)
const jwt = require("jsonwebtoken");
const mail = require("./mail");
const { Navigate } = require("react-router-dom");
const authRoute = require("./routes/auth-route");
const passport = require("passport");
const cookieSession = require("cookie-session");
require('dotenv').config();
// const passportSetup = require("./config/passport");
// const db = require("./config/db");
// const config = require("./config/token");
// const nodemailer = require("nodemailer");
// const passportSetup = require("./passport");
// const { min } = require("ramda");

const server = app.listen(3400, () => {
  console.log("Server Listening on port 3400");
});
const wss = new SocketServer({ server });

app.use(cookieSession({

  keys: ["process.env.COOKIE_SECRET"]
}))//研究一下

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'music_festival',
  // password: 'root',
  // database: 'testwen'
})

db.connect((err) => {
  if (err) {
    return err;
  }
});

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

//--------------------------會員部分-------------------------------------------
//註冊驗證
const authController = (req, res) => {
  const { usernameReg, accountReg, passwordReg, passwordCheck, phoneNumber, birth, address } = req.body;
  const validationResults = validationResult(req);//回傳一個物件，若有錯誤，會在裡面的errors屬性裡
  if (validationResults.errors.length > 0) {
      console.log(validationResults.errors);
      return res.status(422).send({ errors: validationResults.errors });//(422)請求格式正確，但是由於含有語意錯誤，無法回應

  }
  //對密碼進行加密
  const passwordRegA = bcrypt.hashSync(passwordReg, 10);
  const passwordCheckA = bcrypt.hashSync(passwordCheck, 10);

  db.query("insert into member_info (mName,mMail,mPwd,mPwd_check,mPhone,mBirthday,mAddress,mActive,mCode,mPhoto) values(?,?,?,?,?,?,?,0,'',0)"
      , [usernameReg, accountReg, passwordRegA, passwordCheckA, phoneNumber, birth, address]
      , function (err, result) {
          //如果失敗，有error，result為undefined
          //如果成功，有result(物件)，error為null
          if (result) {
              // console.log(result);
              return res.send({ massage: "註冊成功" });

          }
          if (err.code === 'ER_DUP_ENTRY') {
              // console.log(err);
              return res.status(500).send({ errors: [{ msg: "此帳號已註冊過" }] });
          }
          // return res.send(data);//裡面有包含密碼到時候加密後要看會不會有機密問題
      }
  )

  const buff = Buffer.from(accountReg, 'utf-8');
  const account64 = buff.toString('base64');
  // console.log("測試base64",account64);
  mail.sendMail(accountReg, account64);//發送信件
}

//重置密碼驗證
const authControllerReset = (req, res) => {
  const { passwordReset, passwordCheck, token } = req.body;
  const validationResults = validationResult(req);
  // const decode = jwt.verify(token, config.jwtKey);
  const decode = jwt.verify(token, process.env.JWT_KEY);
  console.log(decode);

  if (validationResults.errors.length > 0) {
      console.log(validationResults.errors);
      return res.status(422).send({ errors: validationResults.errors });//(422)請求格式正確，但是由於含有語意錯誤，無法回應

  }

  const passwordResetA = bcrypt.hashSync(passwordReset, 10);
  const passwordCheckA = bcrypt.hashSync(passwordCheck, 10);

  db.query("update member_info set mPwd=? , mPwd_check=? where mMail = ?"
      , [passwordResetA, passwordCheckA, decode.account]
      , function (err, result) {
          if (err) {
              console.log(err);
          } else {
              console.log(result);
          }
      })

  return res.send({ message: "密碼更改成功，請重新登入" });

}

//註冊
app.post("/register", [
  body('usernameReg').notEmpty(),
  body('accountReg', '無效的信箱格式，請確認後再試一次').isEmail(),
  body('passwordReg', '密碼長度必須至少6位，至少包含1個英文字母').trim().isLength({ min: 6 }).matches(/^(?=.*[A-Za-z]).{6,}$/),
  body('passwordCheck', '密碼確認與第一次輸入的密碼不符，請確認後再試一次').trim().custom((value, { req }) => value === req.body.passwordReg),
  body('phoneNumber', '手機號碼格式不符，請確認後再試一次').matches(/^09[0-9]{8}$/),
], authController)




//登入
app.post("/signIn", function (req, res) {
  const { account, password } = req.body;

  db.query("select * from member_info where mMail=?"
      , [account]
      , function (err, result) {
          if (err) throw err;
          if (result.length === 0) {
              return res.status(500).send({ message: "查無帳號請再試一次" });
          }
          // console.log(result[0]);
          if (result[0].mActive === 0) {
              return res.status(500).send({ message: "信箱尚未驗證，無法登入" });
          }
          const passwordConfirm = bcrypt.compareSync(password, result[0].mPwd);
          //比對輸入的密碼跟資料庫密碼是否相同，若相同則回傳true，否則false
          if (!passwordConfirm) {
              return res.status(500).send({ message: "密碼錯誤請再試一次" });
          }

          const payload = {
              mNo: result[0].mNo,
              mMail: result[0].mMail,
              mName: result[0].mName,
              mPhone: result[0].mPhone,
              mBirthday: result[0].mBirthday,
              mAddress: result[0].mAddress
          };

          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
          // const token = jwt.sign(payload, config.jwtKey, { expiresIn: '24h' });
          // return res.send({ message: "登入成功", "token": token, payload });

          return res.send({ message: "登入成功", token });

      }
  )


})


//開通帳號
app.put("/register/active/:mMail", function (req, res) {

  // console.log(req.params.mMail);
  const buff = Buffer.from(req.params.mMail, 'base64');
  const mMail = buff.toString('utf-8');
  // console.log(mMail);
  db.query("update member_info set mActive=1 where mMail = ?"
      , [mMail]
      , function (err, result) {
          if (err) {
              console.log(err);
          } else {
              console.log(result);
          }

      })

  res.send('ok');
})

//發送驗證碼
app.post("/register/reset1", function (req, res) {
  const account = req.body.account;
  const createRandomNum = () => {
      var num = "";
      for (i = 0; i < 6; i++) {
          num += Math.floor(Math.random() * 10);
      }
      return num;//字串
  }
  var code = createRandomNum();

  db.query("select * from member_info where mMail = ?"
      , [account]
      , function (err, result) {
          if (err) {
              console.log(err);
          }
          if (result.length === 0) {
              return res.status(500).send({ message: "查無帳號請再試一次" });
          } else {

              db.query("update member_info set mCode=? where mMail = ?"
                  , [code, account]
                  , function (err, result) {
                      if (err) {
                          console.log(err);
                      } else {


                          mail.codeMail(account, code);
                          // const passConfirm = bcrypt.compareSync(oldPass, result[0].mPwd);
                          // const passwordRegA = bcrypt.hashSync(passwordReg, 10);


                          const payload = {
                              account: account,
                              code: code,
                          };

                          // const token = jwt.sign(payload, config.jwtKey, { expiresIn: '30m' });
                          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '30m' });
                          return res.send({ message: "已發送驗證碼至郵件", "token": token });

                          // console.log(result);
                          // return res.send({ message: "已發送驗證碼至郵件" })
                      }
                  })

          }
      })
})


// 驗證驗證碼
//把前端送過來的資料跟存在資料庫的密碼做比對，如果輸入正確跳轉到第三頁
app.post("/register/reset2", function (req, res) {
  const { code, token } = req.body;
  const decode = jwt.verify(token, process.env.JWT_KEY);
  if (code === decode.code) {
      return res.send({ message: "輸入正確" });
  } else if (code !== decode.code) {
      return res.status(500).send({ message: "驗證碼輸入錯誤請再試一次" });
  }

  // console.log(decode);
})


app.post("/register/reset3", [
  body('passwordReset', '密碼長度必須至少6位，至少包含1個英文字母').trim().isLength({ min: 6 }).matches(/^(?=.*[A-Za-z]).{6,}$/),
  body('passwordCheck', '密碼確認與第一次輸入的密碼不符，請確認後再試一次').trim().custom((value, { req }) => value === req.body.passwordReset),
], authControllerReset)

//確認是否登入

app.get("/check/signin", function (req, res) {
  const token = req.header("Authorization");
  console.log("我是token:", token);
  if (token) {
      try {
          // const decodeCheck = jwt.verify(token, config.jwtKey);
          const decodeCheck = jwt.verify(token, process.env.JWT_KEY);
          console.log("decodeCheck:", decodeCheck);
          res.send({ message: '確認登入', statusCode: 200, currentUser: decodeCheck })
      } catch (TokenError) {
          console.log("token err:", TokenError);
          res.send({ message: TokenError + '請重新登入', statusCode: 401 })
      }
  } else {
      console.log("找不到token");
      res.send({ message: "token失效 請重新登入", statusCode: 402 })
  }

})

//帳號設定，修改密碼
app.post("/member/setting/change", (req, res) => {
  const { currentUser, oldPass, newPass, chkPass } = req.body;

  if (oldPass != "" && newPass != "" && chkPass != "") {
      db.query("select * from member_info where mMail=?"
          , [currentUser]
          , (err, result) => {
              if (err) {
                  console.log(err);
              } else {
                  console.log(result);
                  const passConfirm = bcrypt.compareSync(oldPass, result[0].mPwd);
                  if (!passConfirm) {
                      return res.status(500).send({ message: "密碼錯誤請再試一次" });
                  } else {
                      const rules = /^(?=.*[A-Za-z]).{6,}$/;
                      if (rules.test(newPass) !== true) {
                          return res.status(422).send({ message: "密碼格式不符請再試一次" });
                      };
                      if (newPass !== chkPass) {
                          return res.status(500).send({ message: "兩次密碼輸入不同，請確認後再試" })
                      } else {
                          const newPassA = bcrypt.hashSync(newPass, 10);
                          const chkPassA = bcrypt.hashSync(chkPass, 10);
                          db.query("update member_info set mPwd=? , mPwd_check=? where mMail = ?"
                              , [newPassA, chkPassA, currentUser],
                              (err, result) => {
                                  if (err) {
                                      console.log(err);
                                  } else {
                                      console.log(result);
                                  }
                              })
                          return res.status(200).send({ message: "密碼已更新" });
                      }


                  }
              }

          })

  } else {
      res.status().send({ message: "請勿留空!!" })
  }
})


//拿取使用者資料
app.post("/user/data", function (req, res) {


  // const { currentUser } = req.body;
  // console.log("測試:", req.body, "測試");

  // db.query("select * from member_info where id=?")
})
//存localstorage
// app.get("/signIn/:token",function(req,res){
//     console.log(req.params);
// })

//第三方登入
//點下google圖示後到google授權頁面
// app.get("google", passport.authenticate("google", { scope: ["porfile"] }));


//跳轉到google頁面後導回的頁面
// app.get("auth/google/callback", passport.authenticate("google",{
//     successRedirect:"http://localhost:3000/",//授權成功回首頁
//     failureRedirect:"http://localhost:3000/signIn"//授權失敗回登入頁
// }))
//--------------------------會員部分-------------------------------------------




//--------------------------票券部分-------------------------------------------
app.post("/ticket_order/get_list", (req, res) => {
  console.log(req.body.mNo); //req.body=data
  const {mNo} = req.body; //把req.body解構出來，就是當初打AIXOS裡的data
  const getTicketOrderSQL = `SELECT * FROM ticket_order WHERE mNo=${mNo}`; //WHERE是給mNO條件，選票券訂單的資料庫
  db.query(getTicketOrderSQL, (error, ticketOrderListResult) => {
    console.log("error", error);
    if (error) {
      res.send(error);
    } else {
      console.log('ticketOrderListResult', ticketOrderListResult);
      let getTicketOrderResultList = [];//這個[]裡面要放這支API最後欲得到的資料結構
      return new Promise((resolve, reject) => {
        ticketOrderListResult.forEach((item, key) => {
          const getTicketsSQL = `SELECT * FROM tickets WHERE orderNo = ${item.orderNo}`;
          db.query(
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

//購買單日&雙日票 寫進ticket_order資料庫
app.post("/create_ticket_order", (req, res) => {
  const { mNo, totalTickets, mName, orderTime } = req.body; //把req.body解構出來，就是當初打AIXOS裡的data
  const sql = `INSERT INTO ticket_order (mNo,mName,mPhone,mMail,orderTime,orderStatus,orderPrice,paymentStatus,paymentMethod)
  VALUES('${currentUser.mNo}',"${currentUser.mName}","${currentUser.mPhone}","${currentUser.mMail}","${currentUser.orderTime}",${currentUser.orderStatus},${currentUser.orderPrice},${currentUser.paymentStatus},"${currentUser.paymentMethod}")`;
  db.query(sql, (insertTicketOrderError, insertTicketOrderResults) => {
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
          db.query(
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

//營位
app.get("/ticket_order/get_camp", function (req, res) {
  const getCampSQL = `SELECT * FROM camp`; 
  db.query(getCampSQL, (getCampError, getCampResult) => {
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
//QRcode開始
app.get(`/ticket_order/get_qrcode`,(req,res) =>{
  const {ticketNo} =req.query;
  const sql = `SELECT * FROM tickets WHERE ticketNo = ${ticketNo}`;
  db.query(sql,(error,results)=>{
    console.log('error',error);
    if (error){
      res.send(error);
      console.log("票券失效(流水號查詢不到)")
    }else{
      console.log("流水號有效")
      console.log('results[0]', results[0])
      let toJson = JSON.stringify(results[0]);
      console.log('toJson', toJson)
      let toParse = JSON.parse(toJson);
      
      console.log('toParse', toParse)
      console.log('typeof toParse.isActive', typeof toParse.isActive)
      if(toParse.isActive === 0) {
        console.log("歡迎入場");
        const enterTime = new Date().toLocaleString('zh-Tw', { hour12: false});
        const activateTicketSQL = `UPDATE tickets SET isActive = 1, enterTime = "${enterTime}" WHERE ticketNo = ${ticketNo}`;
        db.query(activateTicketSQL,(updateError,updateResult)=>{ 
          if (updateError){ 
            console.log('updateError', updateError)

          } else {
            
            console.log('updateResult', updateResult)
            res.send(updateResult);
          }
        })
      } else {
        console.log("已有入場紀錄")
      }
      // res.send(results);
    }
  })
});

//--------------------------票券部分-------------------------------------------



module.exports = app;
