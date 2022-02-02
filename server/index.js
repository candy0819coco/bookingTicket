const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var mysql = require('mysql');
var cors = require('cors');//解決跨域問題

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testwen'
});

app.post("/register",function(req,res){
    const usernameReg = req.body.usernameReg;
    const passwordReg = req.body.passwordReg;

    db.query("insert into test01 (username,password) values(?,?)"
    , [usernameReg, passwordReg]
    , function (err, result) {
        console.log(err);
    })
})

app.post("/signIn",function(req,res){
    const username = req.body.username;
    const password = req.body.password;


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