const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');//解決跨域問題
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config/token");
// const { min } = require("ramda");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testwen'
});


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


    db.query("insert into test01 (mName,mMail,mPwd,mPwd_check,mPhone,mBirthday,mAddress) values(?,?,?,?,?,?,?)"
        , [usernameReg, accountReg, passwordRegA, passwordCheckA, phoneNumber, birth, address]
        , function (err, result) {
            //如果失敗，有error，result為undefined
            //如果成功，有result(物件)，error為null
            if (result) {
                return res.send({ massage: "註冊成功" });

            }
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(500).send({ errors: [{ msg: "此帳號已註冊過" }] });
            }

            // return res.send(data);//裡面有包含密碼到時候加密後要看會不會有機密問題
        }
    )


}

app.post("/register", [
    body('usernameReg').notEmpty(),
    body('accountReg', '無效的信箱格式，請確認後再試一次').isEmail(),
    body('passwordReg', '密碼長度必須至少6位，至少包含1個英文字母').trim().isLength({ min: 6 }).matches(/^(?=.*[A-Za-z]).{6,}$/),
    body('passwordCheck', '密碼確認與第一次輸入的密碼不符，請確認後再試一次').trim().custom((value, { req }) => value === req.body.passwordReg),
    body('phoneNumber', '手機號碼格式不符，請確認後再試一次').matches(/^09[0-9]{8}$/),

], authController)



app.post("/signIn", function (req, res) {
    const { account, password } = req.body;

    db.query("select * from test01 where mMail=?"
        , [account]
        , function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                return res.status(500).send({ message: "查無帳號請再試一次" });
            }
            const passwordConfirm = bcrypt.compareSync(password, result[0].mPwd);
            //比對輸入的密碼跟資料庫密碼是否相同，若相同則回傳true，否則false
            if (!passwordConfirm) {
                return res.status(500).send({ message: "密碼錯誤請再試一次" });
            }

            const payload = {
                id: result[0].id,
                mMail: result[0].mMail,
                mName: result[0].mName
            };

            const token = jwt.sign(payload, config.jwtKey, { expiresIn: '24h' });
            return res.send({ message: "登入成功", "token": token, payload });

        }
    )


})


// app.get("/register", function (req, res) {
//     res.set('Access-Control-Allow-Origin', '*');


// })


// module.exports = db;














app.listen(3001, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("ok");
    }
});